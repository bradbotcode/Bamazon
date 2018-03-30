-- schema for famazon_db database --
CREATE DATABASE famazon_db;

USE famazon_db;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL, 
department_name VARCHAR (100) NOT NULL,
price DECIMAL (6,2) NOT NULL, 
stock_quantity INT (5) NOT NULL,
PRIMARY KEY (item_id)
);