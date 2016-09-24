/**
 * @author Mir Rayees
 * @version 1.0
 */

'use strict';
var mongoose = require('mongoose'),
    Cart = require('../models/cart.server.model.js'),
    ErrorHandler = require('../../middelware/error'),
    sendResponse = require(Path.resolve('./server/middelware/response.js')),
    Product = require('../product/model/product.model');


exports.placeOrder = function(request, response) {

    var cart, product;    
   
    var products = request.body.order.products;  
    var amount=0;  
     var order = { 
                products:products,
                amount:
                };
    

        

      
        .then(function(resultArray) {
            product = resultArray[0];          
            if (!product)
                return sendResponse(response, 400, "error", "Product Not Found"); 
                           
                      
        })
        .then(function(activeCart) {
            if (!activeCart)
                return sendResponse(response, 500, "error", "Internal Server Error");
            var product = activeCart.products.id(productId);
            if (product)
                return sendResponse(response, 200, "success", "Product Already in Cart");
            var productAmount = newItem.quantity * newItem.salesPrice;
            var newCartAmount = activeCart.amount + productAmount;
            activeCart.updated = new Date();
            activeCart.products.push(newItem);
            activeCart.amount = newCartAmount;
            activeCart.save(function(error, cart) {
                if (cart)
                    return sendResponse(response, 201, "success", cart);
            });
        })
        .catch(function(error) {
            return sendResponse(response, 201, "error", error);
        })

};


exports.removeFromCart = function(request, response) {
    //Test Data
    // var userId="5757c59e3d47bd50118e07c7";

    var productId = request.params.productId;
    if (!request.body.authorizedUser)
        return sendResponse(response, 401, "error", "Unauthorized");
    var userId = request.body.authorizedUser._id
    if (!(productId && mongoose.Types.ObjectId.isValid(productId)))
        return sendResponse(response, 400, "error", "Invalid Product")
    Cart.removeItem(userId, productId, function(error, cart, message) {
        if (error)
            return sendResponse(response, 500, "error", error);
        if (cart)
            return sendResponse(response, 202, "success", "Product Removed");
        return sendResponse(response, 202, "success", message);
    });

};


exports.updateQuantity = function(request, response) {
    //Test Data
    // var userId="5757c59e3d47bd50118e07c7";
    // var quantity=1;

    if (!request.body.authorizedUser)
        return sendResponse(response, 401, "error", "Unauthorized");

    var userId = request.body.authorizedUser._id
    var productId = request.params.productId;
    var quantity = request.body.quantity;

    if (!(productId && mongoose.Types.ObjectId.isValid(productId)))
        return sendResponse(response, 400, "error", "Invalid Product")

    if (!quantity)
    //Remove From Cart
        return sendResponse(response, 400, "error", "Quantity can't be Zero");
    Cart.getActiveCart(userId)
        .then(function(cart) {
            if (!(cart.products && cart.products.length > 0))
                return sendResponse(response, 400, "error", "No Product To Update");
            var product = cart.products.id(productId);
            if (!product)
                return sendResponse(response, 400, "error", "Product Not Found");
            if (product.quantity === quantity)
                return sendResponse(response, 200, "success", cart);
            var prevProductAmount = product.quantity * product.salesPrice;
            cart.products.id(productId).quantity = quantity;
            cart.updated = new Date();
            var newProductAmount = product.quantity * product.salesPrice;
            var newCartAmount = cart.amount + newProductAmount - prevProductAmount;
            cart.amount = newCartAmount;
            cart.save(function(error, cart) {
                if (cart)
                    sendResponse(response, 200, "success", cart);
            })
        })
        .catch(function(error) {
            sendResponse(response, 400, "error", error);
        })

}


exports.updateCart = function(request, response) {
    //Test Data
    // var userId="5757c59e3d47bd50118e07c7";    
    if (!request.body.authorizedUser)
        return sendResponse(response, 401, "error", "Unauthorized");
    var userId = request.body.authorizedUser._id
    Cart.updateCart(userId, function(error, cart) {
        if (cart)
            return sendResponse(response, 400, "error", cart);
        return sendResponse(response, 400, "error", error);
    })

};

exports.createUserCart = function(request, response) {
    Cart.createCart("5757c59e3d47bd50118e07c7", function(error, result) {
        console.log(result);
    });
};
exports.getCart = function(request, response) {
    var cartId = request.params.productId
    Cart
        .findOne({
            _id: cartId
        })
        .exec()
        .then(function(cart) {
            sendResponse(response, 200, "success", cart)
        })
};

// exports.removeAllFromCart = function(request, response) {

// }