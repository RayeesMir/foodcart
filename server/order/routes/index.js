var express=require('express');
var Router=express.Router();
var Order=require('../controller/order.controller');

Router.route('/')
		.post(Order.placeOrder)
		.get(Order.getAllOrders)

module.exports=Router;