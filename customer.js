// dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

//creating db connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "famazon_db"
});

//function that manages customer experience 
var storeFront = function () {

    connection.query("SELECT * FROM products", function (err, res) {
        var table = new Table({
            head: ["item_id", "product_name", "department_name", "price", "stock_quantity"]
        })
        console.log("");
        console.log("*************************************************************************************************");
        console.log("WELCOME TO FAMAZON! BROWSE OUR ITEMS BELOW TO FIND SOMETHING COOL:");

        for (i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("");
        console.log("-------------------------------------------------------------------------------------------------");
        console.log("");

        inquirer.prompt([{
                name: "itmId",
                type: "input",
                message: "What is the item_id of the item you'd like to purchase today?"

            }, {
                name: "qty",
                type: "input",
                message: "How many units of this item would you like to purchase?"
            }])
            .then(function (answer) {
                var id = answer.itmId - 1;
                var prod = res[id];
                var qty = answer.qty;

                if (qty < res[id].stock_quantity) {
                    console.log("");
                    console.log("Ok, thanks. Your total for " + qty + " " + res[id].product_name + "(s) is: $" + res[id].price.toFixed(2) * qty);

                    connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: res[id].stock_quantity - qty
                        },
                        {
                            item_id: res[id].item_id
                        }
                    ], function (err, res) {
                        storeFront();
                    });
                } else {
                    console.log("");
                    console.log("We're sorry, insufficient quantity. We currently have only " + res[id].stock_quantity + " in inventory.");
                    storeFront();
                }
            })
    });
}
storeFront();