
var express=require('express');

var Product=require('../controller/product.controller');
var Router=express.Router();


Router.route('/')
		.post(Product.createProduct)
		.get(Product.getAllProducts);

module.exports=Router;

