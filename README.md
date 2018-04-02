# Famazon
Node.js and MySQL Amazon-like storefront.

## Description

This application is a command-line storefront built in Node.js and powered by MySQL. The application presents two interfaces: **Customer** and **Manager**.

### Famazon Demo

You can view a demo of the Famazon customer and manager interfaces by clicking the link below:

[Famazon Demo](https://drive.google.com/open?id=1Wn6nAWv-q3RRqr1W_2iMCZ-RLQxJST5k)

#### Customer Interface

The customer interface presents a virtual storefront of items. The storefront includes item ID, name, department and price of each item available. The user is prompted to purchase any item by entering the item ID and desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the item's quantity in the database.

#### Manager Interace

The manager interface presents a list of four options, show below: 

	? Please select an option: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product
	  
**View Products for Sale** -- allows the manager to view the current inventory of store items in a table.

**View Low Inventory** -- shows the manager a list of items with an inventory of < 5 units.

**Add to Inventory** -- allows the manager to select a given product and add additional inventory.

**Add New Product** -- allows the manager to add new products to the database. 
