# agro chain

### This document presents the operation of the “agro chain” platform

### Project tree

![abo](https://user-images.githubusercontent.com/54313119/145922194-3c2539e3-2548-48d4-9dc5-9a1c7db4d56e.png)

### Context

This Dapp is presented in the context of product traceability.
The farmer registers his product with all the information and then validates the transaction
Then on another account, a supermarket, in our case Aziza, searches for a product and then buys it.
The last part concerns the customer who enters the supermarket for his purchases. This checks the QR codes to get all the details about the product from production at the farmer to purchase by the supermarket.

NB: This work is for illustrative purposes and does not respect all the rules for a web application (eg: Security mechanism outside the blockchain, structural logic of objects, etc.)

### To start


Download the source code then install the necessary node packages via “npm install”
run ganache (the RPC network is:  https://127.0.0.1:8545)
configure the ethereum network on metamask and add its accounts.
run the project with "npm run dev" then it opens in the default browser

No need to replace the contract address. It's handled automatically.


The proposed interface contains 3 buttons for the 3 business processes.
Follow the steps in order and wait for transactions to be confirmed before moving on to another process (ex: switching from market purchase to customer to view). As the market buys products, the products are available to the customer (an increase of the QR codes to the number of products)

In the meantime, you can check when launching the application to see that the market is empty (no QR code available) and that there is no product available for the market to buy (Search by product does not give any results ).
