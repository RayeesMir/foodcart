/**
 * @author Mir Rayees <mirrayees859@gmail.com>
 * @version 1.0
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name cannot be blank'],
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'image.png'
    },
    timeToPreapre: {
        type: Number
    }
    // stock: {
    //     type: Number,
    // }
}, {
    timestamp: true
});

// /**
//  * [getSingleProduct Reterives Single Product from Database And Returns Promise]
//  * @param  {[ProductId]} productId [ProductId As valid Mongoose Object]
//  * @return {[Promise]}           [Promise ]
//  */

// ProductSchema.statics.getSingleProduct = function(productId) {
//     return this.findById({
//             _id: productId
//         })
//         .select('-__v -created -updated')
//         .exec()
// };

// /**
//  * [getAllProducts Returns All The Products From Database That Are Published]
//  * @return {[Promise]} [Promise]
//  */

ProductSchema.statics.getAllProducts = function() {
    return this.find({})
        .sort()
        .exec()
};

// /**
//  * [updateProduct Updates Product Based on ProductId Provided]
//  * @param  {[type]} productId      [description]
//  * @param  {[type]} updatedProduct [description]
//  * @return {[type]}                [description]
//  */

// ProductSchema.statics.updateProduct = function(productId, updatedProduct) {

//     return this.findByIdAndUpdate(productId, updatedProduct, {
//         new: true,
//         runValidators: true
//     }).exec()
// };

// /**
//  * [deleteProduct Deletes Product From database]
//  * @param  {[Object]} productId [ProductId of product]
//  * @return {[Promise]}           [Promise ]
//  */

// ProductSchema.statics.deleteProduct = function(productId) {
//     return this.findOneAndRemove({
//             '_id': productId
//         })
//         .exec();
// };

// /**
//  * [countProducts Counts total Number Of Products in database]
//  * @return {[Promise]} [Promise]
//  */

// ProductSchema.statics.countProducts = function() {
//     return this.count({}).exec();
// };

// /**
//  * [submitReview Creates Review In Database ]
//  * @param  {[Object]}   productId [Mongoose Object]
//  * @param  {[Object]}   review    [Json Object]
//  * @param  {Function} callback  [Callback That Handles The Result of the Function]
//  * @return {[type]}             [description]
//  */

// ProductSchema.statics.submitReview = function(productId, review, callback) {
//     var ProductModel = this;
//     var pushedReview;
//     this.findById({_id: productId})
//         .select('reviews')
//         .exec()
//         .then(function(product) {            
//             if (!product)
//                 return callback(null, null,"Product Not Found");
//             product.reviews.push(review);                       
//             pushedReview = product.reviews[product.reviews.length - 1];
//             product.save()                
//         })
//         .then(function(savedProduct) {
//             ProductModel.populate(pushedReview, [{
//                     path: 'user',
//                     model: 'User',
//                     select: 'name _id'
//                     },{
//                     path: 'product',
//                     model: 'Product',
//                     select: 'name _id'
//                     }], function(error, finalReview) {
//                         if (finalReview)
//                             return callback(null, finalReview,null);
//                 });
//             })
//         .catch(function(error) {
//            return callback(error, null,null);
//         })
// };

// /**
//  * [findAllReviews Select All The Review Of A Partivular Product]
//  * @param  {[Object]}   productId [Mongoose Object]
//  * @param  {Function} callback  [Callback That handles Result Of the Function]
//  * @return {[type]}             [description]
//  */

// ProductSchema.statics.findAllReviews = function(productId, callback) {

//     this.findById({
//             _id: productId
//         })
//         .select('reviews')
//         .populate([{
//             path: 'reviews.user',
//             model: 'User',
//             select: 'name'
//         }, {
//             path: 'reviews.product',
//             model: 'Product',
//             select: 'name '
//         }])
//         .sort()
//         .exec()
//         .then(function(reviews) {
//             if (!reviews)
//                 return callback(null, null);
//             return callback(null, reviews);
//         })
//         .catch(function(error) {
//             return callback(error, null)
//         })
// };

// /**
//  * [getSingleReview Select Single Review Of the Product]
//  * @param  {[Object]}   productId [ObjectId]
//  * @param  {[Object]}   reviewId  [description]
//  * @param  {Function} callback  [Callback That Handles The review Returned]
//  * @return {[type]}             [description]
//  */

// ProductSchema.statics.getSingleReview = function(productId,reviewId,callback) {    
//     var ProductModel=this;
//     this.findOne({"_id":productId})
//          .populate([{
//                         path: 'reviews.user',
//                         model: 'User',
//                         select: 'name'
//                     }, {
//                         path: 'reviews.product',
//                         model: 'Product',
//                         select: 'name '
//                     }])
//         .exec()       
//         .then(function(product){                    
//             if (product.reviews && product.reviews.length>0) 
//                 if (product.reviews.id(reviewId)) 
//                     return callback(null,product.reviews.id(reviewId),null);                
//             return callback(null,null,"Review Not Found");
//         })
//         .catch(function(error){
//             return callback(error,null,null);
//         })
// };
// *
//  * [updateReview Updates Review]
//  * @param  {[Object]}   productId     [description]
//  * @param  {[Object]}   reviewId      [description]
//  * @param  {[Object]}   updatedReview [description]
//  * @param  {Function} callback      [description]
//  * @return {[type]}                 [description]

// ProductSchema.statics.updateReview = function(productId,reviewId, updatedReview, callback) {    
//     var ProductModel=this;
//     var reviewFound;
//     this.findOne({"_id":productId}).exec()
//         .then(function(product){  

//                 if (!(product.reviews && product.reviews.length>0))
//                     //pass error as null
//                     //review as null 
//                     //Message No Review to Update
//                     return callback(null,null,"No Reviews To Update");
//                 reviewFound=product.reviews.id(reviewId);
//                 if (!reviewFound)
//                     //error Null
//                     //review null 
//                     //message Review not Found
//                     return callback(null,null,"Review Not Found");
//                 reviewFound.text=updatedReview.text;
//                 reviewFound.product=productId;
//                 reviewFound.rating=updatedReview.rating;
//                 reviewFound.updated=new Date();
//                 product.save()                   
//         })
//         .then(function(product){        
//                 ProductModel
//                 .populate(reviewFound,[{
//                     path: 'user',
//                     model: 'User',
//                     select: 'name _id'
//                     },{
//                     path: 'product',
//                     model: 'Product',
//                     select: 'name _id'
//                     }],
//                 function(error,finalReview){
//                     if (finalReview)                   
//                         return callback(null,finalReview,null);
//                 });            
//         })    
//         .catch(function(error){
//                return callback(error,null,null);
//         })
// };
// /**
//  * [deleteReview Delete a particular Review of Particular Product]
//  * @param  {[Object]}   productId [description]
//  * @param  {[Object]}   reviewId  [description]
//  * @param  {Function} callback  [Callback That handles the Result callback(error, review,message)]
//  * @return {[type]}             [description]
//  */
// ProductSchema.statics.deleteReview = function(productId,reviewId, callback) { 

//    this.findOne({"_id":productId})
//         .exec()
//         .then(function(product){ 

//             if (!(product.reviews && product.reviews.length>0))
//                 // callback(error, review,message)
//                  return callback(null,null,"No Reviews To Delete");

//             if (!product.reviews.id(reviewId))

//                 // callback(error, review,message)
//                 return callback(null,null,"Review Not Found");            
//             product.reviews.id(reviewId).remove();           
//             product.save(function(error,product){
//                 if (error)
//                     // callback(error, review,message)
//                     return callback(error,null,null);
//                 if (product) 
//                     // callback(error, review,message)
//                      return callback(null,true,null);
//             }) 
//         })          
//         .catch(function(error){           
//             // callback(error, review,message)
//             return callback(error,null,null);
//         })
// };

// /**
//  * [changeStock Change the Stock Of particular Product]
//  * @param  {[Object]}   productId [valid Product Id]
//  * @param  {[Object]}   stock     [description]
//  * @param  {Function} callback  [Callback function that handles the result of this function]
//  * @return {[type]}             [Passes values to callback and returns]
//  */
// ProductSchema.statics.changeStock = function(productId, stock, callback) {
//     this.findOne({_id: productId})
//         .select('stock')
//         .exec()
//         .then(function(product) {                            
//             product.stock = stock;                      
//             return product.save()               
//         })
//         .then(function(product) {               
//             return callback(null, product,null);
//         })
//         .catch(function(error) {            
//             return callback(error, null,null);
//         });
// };
// /**
//  * [changePrice Sets The Price Details For a particular Product]
//  * @param  {[Object]}   productId [Valid Mongoose object and valid ProductId]
//  * @param  {[Object]}   price     [Price as json Object]
//  * @param  {Function} callback  [callback function]
//  * @return {[type]}             [description]
//  */
// ProductSchema.statics.changePrice = function(productId, price, callback) {
//     this.findOne({_id: productId})
//         .select('price')
//         .exec()
//         .then(function(product) { 
//             product.price = price;       
//             return product.save()                
//         })
//         .then(function(product) {
//             return callback(null, product);
//         })
//         .catch(function(error) {
//             return callback(error, null);
//         })
// };

ProductSchema.statics.getProduct = function(productId) {
    return this.findById({
            _id: productId
        })
        .select('stock price')
        .exec()
};

module.exports = mongoose.model('Product', ProductSchema);