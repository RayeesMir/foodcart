/**
 * @author Mir Rayees
 * @version 1.0
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var OrderSchema = new Schema({    
    products: [{
        quantity: {
            type: Number,
            trim: true
        },       
        price: {
            type: Number,
            decimal: true,
            trim: true
        }        
    }],    
    amount: {
        type: Number
    },
    payment:{
        type:String
    },
    status: {
        type: String,
        lowercase: true,
        enum: ['incomplete', 'complete'],
        default: 'incomplete'
    }   
},{timestamp:true});
OrderSchema.statics.getOrder=function(orderId){
    return this.findOne({_id:orderId}).exec();
}
OrderSchema.statics.deleteOrder=function(orderId){
    return this.findOneAndRemove({_id:orderId}).exec();
}

OrderSchema.statics.getAllOrders=function(orderId){
    return this
                .find({})
                .populate({
                        path:'products._id',
                        model:'Product',
                        select:'name price'
                        })                
                .exec();                
}
OrderSchema.statics.changeStatus=function(orderId,status){
    return this.findByIdAndUpdate({_id: orderId}, {$set: {status: status}}).exec();    
};
OrderSchema.statics.getOrderOfStatus=function(status){
    return this.find({status:'incomplete'}).exec();    
};
OrderSchema.statics.getIncompleteOrder=function(orderId){
    return this.findById({_id: orderId,status:'incomplete'}).exec();    
};
OrderSchema.statics.deleteIncompleteOrders=function(){
    return this.remove({status:'incomplete'}).exec();
};
module.exports = mongoose.model('Order', OrderSchema);