const { assert } = require("chai")

const Agrochain = artifacts.require('./Agrochain.sol')

contract('Agrochain', (accounts) => {
    before(async() => {
        this.agrochain = await Agrochain.deployed()
    })

    it('deploys successfully', async() => {
        const address = await this.agrochain.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    it('list products', async() => {
        const productCount = await this.agrochain.productNumber()
        const product = await this.agrochain.products(productCount.toNumber())
        assert.equal(product.id_agri.toNumber(), productCount.toNumber())
    })

    it('list purchases', async() => {
        const purchaseCount = await this.agrochain.purchaseNumber()
        const purchase = await this.agrochain.purchases(purchaseCount.toNumber())
        assert.equal(purchase.farmer_id.toNumber(), purchaseCount.toNumber())
    })

    it('create products', async() => {
        const result = await this.agrochain.createProduct(1, "Abebe", "Jimma", "0912345678", "Coffee", "3000", 2000, 2001)
        const productCount = await this.agrochain.productNumber()
        assert.equal(productCount, 1)
        console.log(result)
        const event = result.logs[0].args
    })

    it('create purchases', async() => {
        const result = await this.agrochain.createpurchase(2000, "Kebede", "Addis Ababa", "Coffee", 1)
        const purchaseCount = await this.agrochain.purchaseNumber()
        assert.equal(purchaseCount, 1)
        console.log(result)
        const event = result.logs[0].args
        assert.equal(event.buyer, "Kebede")
        assert.equal(event.farmer_id.toNumber(), 1)
    })
})