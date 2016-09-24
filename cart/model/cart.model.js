/**
 * @author Mir Rayees
 * @version 1.0
 */

'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;     

var CartedItemsSchema=new Schema({     
        _id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            trim: true
        },       
        salesPrice: {
            type: Number,
            decimal: true,
            trim: true
        },
        addedDate: {
            type: Date
        }    
})

var CartSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    products: {
       type:[CartedItemsSchema]
    },
    amount: {
        type: Number,
        trim: true
    },    
    expiryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        enum: ['active', 'completed', 'expired', 'paymentpending'],
        default: 'active'
    }
});

/**
 * [getActiveCart Return User Active cart With product price and stock details]
 * @param  {[Object]} userId [userid ]
 * @return {[type]}        [description]
 */
CartSchema.statics.getActiveCart = function(userId) {
    return this.findOne({user: userId,status: 'active'})
            .populate({
                    path:"products._id",
                    model:"Product",
                    select:"price stock category"
                })            
            .exec();    
};

/**
 * [createCart Creates a in the database with basic details]
 * @param  {[ObjectId]} userId [UserId]
 * @return {[type]}        [description]
 */

CartSchema.statics.createCart=function(userId){
    var newCart=new this();    
    newCart.user=userId;           
    newCart.updated= new Date();        
    newCart.amount=0;
    newCart.expiryDate= new Date(new Date().setMonth(new Date().getMonth() + 3));
    return newCart.save();
            
};
/**
 * [removeItem Removes Product from cart ]
 * @param  {[Object]}   userId    [UserId of the user whom cart belongs to]
 * @param  {[Object]}   productId [Product that is to be remove from cart]
 * @param  {Function} callback  [callback that handles the result of the removal of product from cart]
 * @return {[type]}             [description]
 */
CartSchema.statics.removeItem=function(userId,productId,callback){    
    this.getActiveCart(userId)
        .then(function(cart){ 
            var product=cart.products.id(productId);
            if (!(cart.products && cart.products.length>0)) 
                // callback(error, review,message)
                return callback(null,null,"No Product To Remove");           
            if (!product) 
                // callback(error, review,message)
                 return callback(null,null,"Product Not Found");

            //Cart Amount Calculation and update
            var productAmount=product.quantity*product.salesPrice;
            var newCartAmount=cart.amount-productAmount;
            cart.amount=newCartAmount;           
            //removing product from cart
            cart.products.id(product.id).remove();

            //save cart after removal                        
            cart.save(function(error,cart){                
                if (cart)
                   return callback(null,cart);
            })
        })
        .catch(function(error){
            callback(error,null)
        })
};
/**
 * [updateCart Updates The Cart with Latest Price from product Table]
 * @param  {[Object]}   userId   [UserId of the user]
 * @param  {Function} callback [callback that handles the result of updation of cart]
 * @return {[type]}            [description]
 */
CartSchema.statics.updateCart = function(userId,callback) {
    this.getActiveCart(userId)       
        .then(function(cart) {
            
            var newCartAmount = 0;
            if (!cart)
                return callback(null,null,"Cart Not Found");
            //Traverse products in cart and change price and calculate total cart amount
            cart.products.forEach(function(product) {

                var updatedProductData=product._id;               
                product.salesPrice = updatedProductData.price.salesPrice;
                product.listPrice = updatedProductData.price.listPrice;
                newCartAmount += product.salesPrice * product.quantity;
                product._id = updatedProductData._id
            
            });

            //update cart amount
            cart.amount = newCartAmount;
            
            //save cart after updation
            return cart.save(function(error,cart){
                if (cart) 
                    return callback(null,cart);
            });
        })
        .catch(function(error){
            callback(error,null);
        });
};
CartSchema.statics.getCartById = function(cartId) {
    return this.findById({_id: cartId,status: 'active'}).exec();    
};

/**
 * [expireCart Expires product in active cart has been order has been placed ]
 * @param  {[type]} cartId [description]
 * @return {[type]}        [description]
 */
CartSchema.statics.expireCart = function(cartId) {
    return this.findByIdAndUpdate({_id: cartId}, {$set: {status: 'expired'}}).exec();    
};


module.exports = mongoose.model('Cart', CartSchema);