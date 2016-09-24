/**
 * @author Mir Rayees
 * @version 1.0
 */

'use strict';
var mongoose = require('mongoose'),   
    sendResponse = require('../../middleware/response.js'),
    Order = require('../model/order.model');


exports.placeOrder = function(request, response) {
    var products = request.body.order.products;
    var payment=request.body.order.payment;
    var amount = 0;
    var newOrder = {
        products: products,
        amount:amount
    };
    var order=new Order(newOrder)
    order.save()
        .then(function(createdOrder) {
            if (!createdOrder)
                return sendResponse(response, 500, "error", "Internal Server Error");
            return sendResponse(response, 201, "success", createdOrder);
        })
        .catch(function(error) {
            return sendResponse(response, 500, "error", error);
        })
};

exports.getAllOrders=function(request,response){
    Order.getAllOrders()
        .then(function(orders){
            return sendResponse(response, 201, "success", orders);
        })
        .catch(function(error){
             return sendResponse(response, 500, "error", error);
        })

};



