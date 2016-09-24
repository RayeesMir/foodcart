/**
 * @author Mir Rayees
 * @version 1.0
 */

/**
 *  Product Controller
 */

'use strict';
var mongoose = require('mongoose'),
    Path=require('path'),
    Product = require('../model/product.model'),
    _ = require('lodash');
    // ErrorHandler = require('../../middelware/error');
var sendResponse = require('../../middleware/response.js');
/**
 * [createProduct Will Create a Basic Product And Will Return created Product]
 * @param  {[object]} request  [Request Object]
 * @param  {[object]} response [Response Object]
 * @return {[object]}          [Created Product in result object of response]
 */
exports.createProduct = function(request, response) {

    //Fake data For Testing Purpose
    request.body.product = {
        name: "Pani Poori 2nd",
        price: 50,
        stock: 100
    };
    if (!request.body.product)
        return sendResponse(response, 400, "error", "Missing Parameters");
    //Extract Product and category From request
    var product = request.body.product;

    // Check If Product Is Not Empty and categoryId is valid mongoose object
    if (!(product))
        return sendResponse(response, 400, "error", "Invalid Parameters");
    //Create Instance Of the Product Model
    var newProduct = new Product(product);
    newProduct.save()
        .then(function(createdProduct) {
            sendResponse(response, 200, "success", createdProduct);
        })
        .catch(function(error) {
            sendResponse(response, 400, "error", ErrorHandler.getErrorMessage(error));
        });

};

// /**
//  * [getAllProducts Will Return The All The Basic Details Of the Product from Basic Product Collection]
//  * @param  {[object]} request  [Request Object]
//  * @param  {[object]} response [Response Object]
//  * @return {[object]}          [All Product in result object of response]
//  */
exports.getAllProducts = function(request, response) {
    
    //Find All Basic Products And Sort
    Product.getAllProducts()
        .then(function(products){
           return sendResponse(response, 200, "success", products);
        })
        .catch(function(error){
           return sendResponse(response, 400, "error", error);
        });
};

// /**
//  * [getOneProduct Select A single Basic Product And returns That]
//  * @param  {[object]} request  [Request Object]
//  * @param  {[object]} response [Response Object]
//  * @return {[object]}          [Single Product in result object of Response]
//  */
// exports.getOneProduct = function(request, response) {
//     //Get ProductId from Url Params
//     var productId = request.params.productId;

//     //Check For Empty ProductId  and ProductId as Valid mongoose object
//     if (productId &&  mongoose.Types.ObjectId.isValid(productId)) {

//         //Find Product By ProductId
//         //On Success Return Product
//         //on Failure Return Error
//         //Call to getSingleProduct Model Method 
//         Product.getSingleProduct(productId)            
//             .then(function(product) {
//                 if (product)
//                     return sendResponse(response, 200, "success", product);
//                 else
//                    return sendResponse(response, 404, "error", "Not Found");
//             })
//             .catch(function(error) {
//                 return sendResponse(response, 400, "error", error);
//             })
//     }
//     else
//     //Invalid ProductId (ProductId must be valid object of type mongoose.type.objectid)
//     return sendResponse(response, 404, "error", "Invalid Product");

// };

// /**
//  * [updateProduct Updates The Basic Product And Returns Updated Product]
//  * @param  {[type]} request  [description]
//  * @param  {[type]} response [description]
//  * @return {[type]}          [Updated Product in Result Object Of The Response]
//  */
// exports.updateProduct = function(request, response) {

//     //Fake data For Testing Purpose

//     //  var FnewProduct = {
//     //     name: Faker.commerce.productName(),
//     //     category: '57148a1030b2961c1592a505',
//     //     shortDescription: Faker.lorem.sentences(),
//     //     longDescription: Faker.lorem.sentences(),                
//     //     backordered: Faker.random.boolean(),
//     //     published: Faker.random.boolean(),
//     //     images:{
//     //         fullImageDesktop:Faker.image.image(),
//     //         thumbnailDesktop:Faker.image.image(),
//     //         fullImageTab: Faker.image.image(),
//     //         thumbnailTab: Faker.image.image(),
//     //         fullImageMobile:Faker.image.image(),
//     //         thumbnailMobile:Faker.image.image(),
//     //         position:0
//     //     }       

//     // };


//     //Get ProductId from url Params
//     var productId = request.params.productId;

//    //Check For Empty CategoryId, Empty request body and Valid ProductId Object
//     if (productId && request.body.product &&  mongoose.Types.ObjectId.isValid(productId) ) {

//     //Extract the Updated Product From The Body Of the Request using lodash extend method
//        var updatedProduct = _.extend(request.body.product);

//        //Delete CreatedAt Value if present
//        delete updatedProduct.createdAt;

//        //Set updatedAt To Current Date
//        updatedProduct.updatedAt=new Date();

//        //Find Product By ProductId And Update
//        //On Success return Updated Product
//        //On failure retur Error
//         Product.updateProduct(productId, updatedProduct)           
//             .then(function(updatedProduct){
//                 return sendResponse(response, 200, "success", updatedProduct);
//             })
//             .catch(function(error){
//                 return sendResponse(response, 400, "error", ErrorHandler(error));
//             });

//     }
//     else

//     //Invalid ProductId (ProductId must be valid object of type mongoose.type.objectid)
//     sendResponse(response, 404, "error", "Invalid Product");
// };

// /**
//  * [deleteProduct Deletes A Single Product based On The Product Id Specfied]
//  * @param  {[object]} request  [Request Object]
//  * @param  {[object]} response [Response Object]
//  * @return {[object]}          [Deleted Product in result object of Response]
//  */

// exports.deleteProduct = function(request, response) {
//     //Get Product Id from Url Params
//     var productId = request.params.productId;

//     //Check For Empty ProductId
//     if (productId  &&  mongoose.Types.ObjectId.isValid(productId)){

//         //Find Product Using ProductId And Remove
//         //On Success return Deleted Product
//         //on Failure return Error
//         Product.deleteProduct(productId)
//             .then(function(product){
//                  if (!product)
//                     return sendResponse(response, 404, "success", "Not Found");
//                         return sendResponse(response, 202, "success", product);                        
//             })
//             .catch(function(error){
//                 sendResponse(response, 400, "error", ErrorHandler(error));
//             });
//     } else

//     //Invalid ProductId (ProductId must be valid object of type mongoose.type.objectid)
//     sendResponse(response, 404, "error", "Invalid Product");
// };

// /**
//  * [getProductCount returns The Total Number Of Product In DataBase]
//  * @param  {[object]} request  [Request Object]
//  * @param  {[object]} response [Response Object]
//  * @return {[object]}          [Number Of Core Product In Database]
//  */
// exports.getProductCount = function(request, response) {

//     //Get The ToTal Number Of Core Products In database
//     Product.countProducts()        
//         .then(function(count){
//             return sendResponse(response, 200, "success", count);
//         })
//         .catch(function(error){
//             return sendResponse(response, 400, "error", ErrorHandler(error));
//         })

// };
// /**
//  * [getAllReviews Reterives All reviews based on productId]
//  * @param  {[object]} request  [Request Object]
//  * @param  {[object]} response [Response Object]
//  * @return {[object]}          [reviews in result object of response]
//  */
// exports.getAllReviews=function(request,response){

//     //Check User is logedIn or not
//     if (!request.body.authorizedUser) 
//         return sendResponse(response,403,"error","Unauthorized");

//     //Get Product Id From Params
//     var productId=request.params.productId;
//     //Check If ProductId Is Valid mongoose Object and not empty
//     //Return on Test Fail
//     if (!(productId && mongoose.Types.ObjectId.isValid(productId))) 
//         return sendResponse(response,400,"error","Invalid Product");    

//     //Call findAllReviews Model Method To get All Reviews
//     //on error Return Error
//     //on reviews return reviews
//     //else Product Not Found
//     Product.findAllReviews(productId,function(error,reviews){
//         if (error)
//             return sendResponse(response,400,"error",ErrorHandler(error))
//         if (reviews)
//             return sendResponse(response,201,"success",reviews);
//         return sendResponse(response,404,"error","Product Not Found");
//     })    
// };

// /**
//  * [getSingleReview Reterives Single Review on a particular Product]
//  * @param  {[object]} request  [Request Object]
//  * @param  {[object]} response [Response Object]
//  * @return {[object]}          [Single review in result object of response]
//  */
// exports.getSingleReview=function(request,response){

//     //Check User is logedIn or not
//     if (!request.body.authorizedUser) 
//         return sendResponse(response,403,"error","Unauthorized");
//     //Extract productId and ReviewId from params
//     var productId=request.params.productId;    
//     var reviewId=request.params.reviewId;

//     //Check for empty and valid mongoose object reviewId and ProductId
//     if (!(productId && reviewId && mongoose.Types.ObjectId.isValid(productId) && mongoose.Types.ObjectId.isValid(reviewId))) 
//       return sendResponse(response,400,"error","Invalid Product/Review");         

//     //Call To getSingleReview Model Method  with arguments productId,ReviewId and Callback()
//     //On Null return of review and error, means Product Not Found and return not found to user
//     //On Error Return error to user
//     //On review Found Return User Found
//     Product.getSingleReview(productId,reviewId,function(error,review,message){      
//         if (!message)
//             var message="Product Not Found"
//         if (error)
//             return sendResponse(response,400,"error",ErrorHandler(error))
//         if (review)
//             return sendResponse(response,201,"success",review);
//         return sendResponse(response,404,"error",message);
//     })    
// };
// /**
//  * [submitReview Creates A Review ]
//  * @param  {[Object]} request  [Request Object Containing review]
//  * @param  {[Object]} response [Response Object Containing Submitted Review]
//  * @return {[Object]}          [created Review in result object of response]
//  */
// exports.submitReview = function(request, response) {
//     //Testing data
//     // var review = {
//     //     user: "5757c59e3d47bd50118e07c7",
//     //     product:productId ,
//     //     text: Faker.lorem.words(),
//     //     rating: 5
//     // };

//     // Login Check 
//     if (!request.body.authorizedUser) 
//         return sendResponse(response, 401, "error", "Unauthorized");

//     //Get ProductID From params
//     var productId=request.params.productId;

//    //Validation Check
//     if (!(productId && mongoose.Types.ObjectId.isValid(productId)))
//         return sendResponse(response, 400, "error", "Invalid Product");

//     //Check fpr body and review
//     if (!(request.body && request.body.review))
//         return sendResponse(response,422,"error","Parameters Missing");

//    //Get Review from body
//     var review = request.body.review;

//     //To Do
//     // Check If User Has purchased This Product or not           

//     //Create Review object
//     var review = {
//         user: request.body.authorizedUser._id,
//         product: productId,
//         text: review.text,
//         rating: review.rating,
//         updated:new Date()
//     }

//     //Call to submitReview model Method
//     Product.submitReview(productId,review,function(error,review,message){
//         if (!message)
//             message="Product Not Found"
//         if (error)
//             return sendResponse(response,400,"error",ErrorHandler(error))
//         if (review)
//             return sendResponse(response,201,"success",review);
//         return sendResponse(response,400,"error",message);

//     })        
// };
// /**
//  * [updateReview Updates A particular Review Based on reviewId]
//  * @param  {[Object ]} request  [Request]
//  * @param  {[Object ]} response [Response]
//  * @return {[Object ]}          [Updated Review in result object of response]
//  */
// exports.updateReview=function(request,response){
//     //Testing Data 
//     // var updatedReview = {
//     //     user: "5757c59e3d47bd50118e07c7",
//     //     product:productId ,
//     //     text: Faker.lorem.words(),
//     //     rating: 5,
//     //     updated:new Date()
//     // };

//     //Login Check 
//     if (!request.body.authorizedUser) 
//         return sendResponse(response, 401, "error", "Unauthorized");

//     //Get productId and reviewId
//     var productId=request.params.productId;
//     var reviewId=request.params.reviewId;

//     // Validation Check
//     if (!(productId && reviewId && mongoose.Types.ObjectId.isValid(productId) && mongoose.Types.ObjectId.isValid(reviewId))) 
//         return sendResponse(response,400,"error","Invalid Product/Review"); 

//     //Check For Empty body and review
//     if (!(request.body && request.body.review))
//         return sendResponse(response,400,"error","Parameters Missing");    
//     //Get Review from body
//     var review=request.body.review;

//     //Create Updated Review object
//     var updatedReview = {
//         user: request.body.authorizedUser._id,
//         product: productId,
//         text: review.text,
//         rating: review.rating,
//         updated:new Date()
//     }

//     //Call To updateReview Model Method
//     Product.updateReview(productId,reviewId,updatedReview,function(error,updatedReview,message){
//         if (!message)
//             message="Product Not Found";
//         if (error)
//             return sendResponse(response,400,"error",ErrorHandler(error));
//         if (updatedReview)
//             return sendResponse(response,200,"success",updatedReview);
//         return sendResponse(response,404,"error",message); 
//     });
// };

// /**
//  * [deleteReview Delete a particular Review ]
//  * @param  {[Object]} request  [Request Object]
//  * @param  {[Object]} response [Response Object]
//  * @return {[Object]}          [Deleted review (NUll)]
//  */
// exports.deleteReview=function(request,response){
//     //Check User Login
//     if (!request.body.authorizedUser) 
//         return sendResponse(response, 401, "error", "Unauthorized");

//     //Check For Empty Body And Review
//     if (!(request.body && request.body.review))
//         return sendResponse(response,422,"error","Parameters Missing");

//     //Get ProductId And ReviewId
//     var productId=request.params.productId;
//     var reviewId=request.params.reviewId;

//     //Validation Check
//     if (!(productId && reviewId && mongoose.Types.ObjectId.isValid(productId) && mongoose.Types.ObjectId.isValid(reviewId))) 
//       return sendResponse(response,400,"error","Invalid Product/Review"); 

//   //Call To deleteReview Model Methods
//     Product.deleteReview(productId,reviewId,function(error,deletedReview,message){
//          if (!message)
//             message="Product Not Found"
//         if (error)
//             return sendResponse(response,400,"error",ErrorHandler(error));
//         if (deletedReview)
//             return sendResponse(response,204,"success",deletedReview);
//         return sendResponse(response,404,"error",message); 
//     });
// };
// /**
//  * [changeStock Changes Stock For Product]
//  * @param  {[Object]} request  [Request Object]
//  * @param  {[Object]} response [Response Object]
//  * @return {[Object]}          [Result Object in Response object Of Result]
//  */
// exports.changeStock=function(request,response){
//     //Testing Data
//     // var stock={
//     //     stockQuantity:11500,
//     //     soldOut:true,
//     //     lowQuantity:true,
//     //     stockThreshold:500
//     // };   

//     //Check For User Login 
//      if (!request.body.authorizedUser) 
//         return sendResponse(response, 401, "error", "Unauthorized");

//     //Extract Product Id
//     var productId=request.params.productId;    

//     //Validation Check
//     if (!mongoose.Types.ObjectId.isValid(productId))
//          return sendResponse(response,422,"error","Invalid Product");

//     // Check empty body and stock
//     if (!(request.body && request.body.stock))
//         return sendResponse(response,400,"error","Parameters Missing");

//     //Extract stock from body
//     var stock=request.body.stock;
//     //Check quantity is present or not
//     if (!stock.stockQuantity)
//         return sendResponse(response,422,"error","Missing Parameters");

//     //Call To changeStock Model Methods
//     Product.changeStock(productId,stock,function(error,product,message){
//         if (!message)
//             message="Product Not Found";
//         if (error)
//             return sendResponse(response,400,"error",ErrorHandler(error));
//         if (!product) 
//             return sendResponse(response,404,"error","Not Found");
//         return sendResponse(response,200,"success",product);
//    })
// };

// /**
//  * [setPrice Set The Price Of Product Return changed Price on success]
//  * @param {[object]} request  [Request]
//  * @param {[object]} response [Response]
//  */
// exports.setPrice=function(request,response){
//     var productId=request.params.productId;  
//      // Testing Data
//     // var price={
//     //     cost:400,
//     //     listPrice:400,
//     //     salesPrice:300
//     // };     

//     //Check If User Is loged in or not
//     if (!request.body.authorizedUser) 
//         return sendResponse(response, 401, "error", "Unauthorized");

//     //Check Empty ProductId and valid mongoose object
//     if (!(productId && mongoose.Types.ObjectId.isValid(productId)))
//         return sendResponse(response,422,"error","Invalid Product");

//     //Check If Body and price are not empty
//     if (!(request.body && request.body.price))
//         return sendResponse(response,400,"error","Parameters Missing");

//     //Extract Price from body
//     var price=request.body.price;    

//     //Call To changePrice Model method with productId, Price and callback as args 
//     Product.changePrice(productId,price,function(error,product,message){
//         if (!message)
//             message="Product Not Found";
//         if (error)
//             return sendResponse(response,400,"error",ErrorHandler(error));
//         if (!product) 
//             return sendResponse(response,404,"error","Not Found");
//         return sendResponse(response,200,"success",product);
//    });        
// };