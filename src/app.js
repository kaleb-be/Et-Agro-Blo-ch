App = {
    contracts: {},
    farmer: [],
    products: [],

    value: "",



    load: async() => {
        await App.connectMetamask()
        await App.loadAccount()
        await App.render()
        await App.loadContract()
        await App.renderpurchase()


    },

    connectMetamask: async() => {

        //connection by button
        const ethereumButton = document.querySelector('#enableEthereumButton');
        // const showAccount = document.querySelector('#showAccount');

        if (window.ethereum) {
            App.web3Provider = window.ethereum;

            ethereumButton.addEventListener('click', async() => {

                await ethereum.request({ method: 'eth_requestAccounts' });

            });

        }

        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

    },

    loadAccount: async() => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]

        console.log(App.account);
        console.log("####### account end ########");

    },


    loadContract: async() => {
        // Create a JavaScript version of the smart contract

        const agrochain = await $.getJSON('Agrochain.json')

        App.contracts.Agrochain = TruffleContract(agrochain)

        App.contracts.Agrochain.setProvider(App.web3Provider)


        // Hydrate the smart contract with values from the blockchain
        App.agrochain = await App.contracts.Agrochain.deployed()


    },

    render: async() => {


        // Render Account
        $('#showAccount').html(App.account)
        $('#value').html(App.value)


    },

    renderProducts: async() => {
        console.log('loading')
        const product_name = document.querySelector('#product_name').value;
        console.log("######### product id #########");
        console.log(product_name);
        console.log("##############################");

        // Load the total task count from the blockchain
        const productcount = await App.agrochain.productNumber()

        // Render out each task with a new task template
        for (var i = 1; i <= productcount; i++) {
            // Fetch the task data from the blockchain
            const product = await App.agrochain.products(i)
            App.products.push(product)
            console.log("got product");

            if (product[4] === product_name) {
                console.log("matching");
                App.farmer = [productcount, product[0].toNumber(), product[1], product[2], product[3], product[4], product[5], product[6].toNumber(), product[7].toNumber()]

            }

        }
        console.log(App.farmer);
        console.log(App.products);



        $('#agri_name').html(App.farmer[2])
        $('#agri_location').html(App.farmer[3])
        $('#agri_telephone').html(App.farmer[4])
        $('#product_name').html(App.farmer[5])
        $('#agri_price').html(App.farmer[6])
        $('#date_prod').html(App.farmer[7])
        $('#date_exp').html(App.farmer[8])


    },

    purchase: async() => {

        const date_purchase = 2021
        const buyer = "AZIZA"
        const place = "Ariana"
        const product_name = App.farmer[5]
        const id_farmer = App.farmer[1]
        await App.agrochain.createpurchase(date_purchase, buyer, place, product_name, id_farmer, { from: App.account })

    },

    renderpurchase: async() => {

        const productcount = await App.agrochain.productNumber()
        const purchasecount = await App.agrochain.purchaseNumber()
        count = productcount - 1
        const qrTemplate = $('#qrcode-2')
        var trace

        for (var i = 1; i <= productcount; i++) {
            // Fetch the product data from the blockchain
            const product = await App.agrochain.products(i)
            App.products.push(product)
            console.log("got product");

        }


        for (var i = 0; i <= count; i++) {
            // Fetch the task data from the blockchain
            const purchase = await App.agrochain.purchases(i + 1)
            console.log("got purchase");

            arr_purchase = [i, purchase[0].toNumber(), purchase[1], purchase[2], purchase[3], purchase[4].toNumber()]

            App.purchase = arr_purchase.toString()

            console.log(App.purchase.toString());

            //Opération de traçabilité
            console.log("##### 0000000000000000 ##########");
            console.log(App.products[i]);
            console.log("##### 0000000000000000 ##########");

            if (purchase[4].toNumber() === App.products[i][0].toNumber()) {
                console.log("we got matching on trace");
                //trace = [purchase, App.products[i]]
                trace = {
                    "name ": App.products[i][4],
                    "price ": App.products[i][5],
                    "date prod ": App.products[i][6].toNumber(),
                    "date exp ": App.products[i][7].toNumber(),
                    "producer ": App.products[i][1],
                    "location ": App.products[i][3],
                    "telephone ": App.products[i][2],
                    "buyer ": purchase[1],
                    "date purchase ": purchase[0].toNumber(),
                    "place ": purchase[2],

                }

                App.value = JSON.stringify(trace)

                sessionStorage.setItem("value", trace)

                console.log(JSON.stringify(trace));
            }

            //create each template

            var elem = document.createElement('div')
            elem.id = i
            elem.className = "col-2"
            console.log("elem.id:" + elem.id);
            document.querySelector("#qrcode-2").appendChild(elem)

            var qrcode = new QRCode(document.getElementById(i), {
                text: JSON.stringify(trace),
                width: 128,
                height: 128,
                colorDark: "#5868bf",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

        }
        console.log("purchase number");
        console.log(purchasecount.toNumber());

    },

    createProduct: async() => {
        const id_agri = parseInt(document.querySelector('#num_agri').value);
        const agri_name = document.querySelector('#agri_name').value;
        const agri_location = document.querySelector('#agri_location').value;
        const agri_telephone = document.querySelector('#agri_telephone').value;
        const product_name = document.querySelector('#product_name').value;
        const agri_price = document.querySelector('#agri_price').value;
        const date_prod = parseInt(document.querySelector('#date_prod').value);
        const date_exp = parseInt(document.querySelector('#date_exp').value);

        var data = [id_agri, agri_name, agri_location, agri_telephone, product_name, agri_price, date_prod, date_exp]

        console.log(data);

        App.agrochain.createProduct(id_agri, agri_name, agri_location, agri_telephone, product_name, agri_price, date_prod, date_exp, { from: App.account })


    },


}

window.onload = function() {
    App.load();
    Particles.init({
        selector: '.background',
        connectParticles: true,
        maxParticles: 100,
    });

};


$(document).ready(function() {
    $('#form1').show();
    $('#form2').hide();

    $("#formok").click(function() {
        $("#form1").hide();
        $('#form2').show();
    });
    $("#Valider").click(function() {

        swal({
                title: "Are you sure?",
                text: "Once validated, you cannot go back",
                icon: "info",
                buttons: true,
                dangerMode: false,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Registration validated! Please validate the transaction from your wallet", {
                        icon: "success",
                    });
                    App.createProduct();
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    swal("Registration not validated", {
                        icon: "error",
                    });
                }
            });

    })
})