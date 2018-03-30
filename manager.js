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

//function that prompts manager to select a task
var manage = function () {

    console.log("");
    console.log("*************************************************************************************************");
    console.log("");

    inquirer.prompt({
            name: "menu",
            type: "list",
            message: "Hey, Boss! What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            if (answer.menu === "View Products for Sale") {
                viewProd();
            } else if (answer.menu === "View Low Inventory") {
                viewLow();
            } else if (answer.menu === "Add to Inventory") {
                addInv();
            } else if (answer.menu === "Add New Product") {
                addProd();
            }
        })
}

//function to view products
function viewProd() {

    connection.query("SELECT * FROM products", function (err, res) {
        var table = new Table({
            head: ["item_id", "product_name", "department_name", "price", "stock_quantity"]
        })
        console.log("");
        console.log("*************************************************************************************************");
        console.log("");
        console.log("HERE IS A CURRENT LIST OF ITEMS FOR SALE: ");

        for (i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        manage();
    })
}

//function to view low inventory
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
            console.log("-------------------------------------------------------------");
            console.log("");
            console.log("NO PRODUCTS ARE CURRENTLY IN LOW INVENTORY");
            console.log("");
            console.log("-------------------------------------------------------------");
            manage();
        } else {
            var table = new Table({
                head: ["item_id", "product_name", "department_name", "price", "stock_quantity"]
            })
            console.log("");
            console.log("*************************************************************************************************");
            console.log("");
            console.log("HERE ARE THE LOW INVENTORY PRODUCTS: ");

            for (i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(table.toString());
            manage();
        }
    })
}

//function to add inventory
function addInv() {

    var products = [];
    var sQ;
    connection.query("SELECT product_name FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            products.push(res[i].product_name);
        }

        inquirer.prompt([{
                name: "which",
                type: "checkbox",
                message: "Which product would you like to add inventory to?",
                choices: products

            }, {
                name: "add",
                type: "input",
                message: "How much inventory would you like to add?"
            }])
            .then(function (answer) {
                var prod = answer.which.join(" ");
                console.log(prod);
                var amt = answer.add;
                console.log(amt);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: +amt
                }, {
                    product_name: prod

                }], function (err) {
                    if (err) throw err;
                })
                console.log("");
                console.log("*************************************************************************************************");
                console.log("");
                console.log("INVENTORY HAS BEEN ADDED! ");
                manage();
            })
    })
}

//function to add new product
function addProd() {

    inquirer.prompt([{
        name: "prod",
        type: "input",
        message: "What product would you like to add?"
    }, {
        name: "dept",
        type: "input",
        message: "Please provide a department for this product:",
    }, {
        name: "price",
        type: "input",
        message: "Enter the product price:"
    }, {
        name: "stock",
        type: "input",
        message: "How much inventory are you adding?"
    }]).then(function (answer) {

        var newProd = {
            product_name: answer.prod,
            department_name: answer.dept,
            price: answer.price,
            stock_quantity: answer.stock
        }

        connection.query('INSERT INTO products SET ?', newProd,
            function (err) {
                if (err) throw err;
                console.log("");
                console.log("*************************************************************************************************");
                console.log("");
                console.log(newProd.product_name + " HAS BEEN ADDED TO DATABASE INVENTORY!.");
                manage();
            });
    });
}
manage();