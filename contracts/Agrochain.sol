pragma solidity >=0.4.22 <0.9.0;

contract Agrochain {

    uint public productNumber = 0;
    uint public purchaseNumber = 0;

    constructor() public {
        createProduct(1,"Abebe","Jimma","0912345678","Coffee","3000",2000,2001);
        createpurchase(2000, "Kebede", "Addis Ababa", "Coffee", 1);
    }

    struct Product {
        uint id_agri;
        string agri_name;
        string agri_location;
        string agri_telephone;
        string product_name;
        string agri_price; 
        uint date_prod;
        uint date_exp;
    }

        

    struct purchase {
        uint purchase_date; 
        string buyer;
        string place;
        string product_name; 
        uint id_farmer; 
    }



    mapping(uint => Product) public products;

    mapping(uint => purchase) public purchases;
// OBSERVER PATTERN HERE.
    event ProductCreated(
        uint id_agri,
        string agri_name,
        string agri_location,
        string agri_telephone,
        string product_name,
        string agri_price,
        uint date_prod,
        uint date_exp
        
    );

        

    event purchaseCreated(
        uint purchase_date,
        string buyer,
        string place,
        string product_name,
        uint id_farmer
    );


    function createProduct(uint id_agri, string memory _agri_name, string memory _agri_telephone, string memory _agri_location, string memory _product_name, string memory _agri_price, uint date_prod, uint date_exp) public {
        productNumber ++;
        products[productNumber] = Product(id_agri, _agri_name, _agri_location, _agri_telephone,_product_name, _agri_price, date_prod, date_exp);
        emit ProductCreated(id_agri, _agri_name, _agri_location, _agri_telephone,_product_name, _agri_price, date_prod, date_exp);
    }



   function createpurchase(uint purchase_date, string memory _buyer, string memory _place, string memory _product_name, uint id_farmer) public {
        purchaseNumber ++;
        purchases[purchaseNumber] = purchase(purchase_date, _buyer, _place, _product_name, id_farmer);
        emit purchaseCreated(purchase_date, _buyer, _place, _product_name, id_farmer);
    }


}
