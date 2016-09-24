/**
 * @author Mir Rayees
 * @version 1.0
 */
'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'), //For generating Salt
    validator = require('validator'); // For Validation

var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        default: '',
        required:true
        
    },
    password: {
        type: String,       
        default: '',
        required:true,
        minlength:6        
    },
    salt: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        required:true,
        lowercase: true,
        trim: true,
        default: '',
        match: /.+\@.+\..+/       
    },
    mobile: {
        type: String,
        unique: true,        
        trim: true,
        required:true
        
    },
    profileImageURL: {
        type: String,
        default: 'default.png'
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    role: {
        type: String,
        enum: ['admin', 'shop manager', 'customer',
            'operator'
        ],
        default: ['customer'],
        required: 'Please provide at least one role'
    },   
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }   
});

/**
 * [This is the pre save Hook for generating salt and save that in this Object]
 * @param  {[event]}    [This specifies when the hook will trigger]
 * @param  {[Function]}    [This specifies when the hook will trigger]
 * @return {[passes control]}       [call to next ]
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

/**
 * [hashPassword Is used to hash password at the time of user signup and login]
 * @param  {[string]} password [password entered by user]
 * @return {[string]}          [Return hash on success and argument(password) back to caller ]
 */
UserSchema.methods.hashPassword = function(password) {
    if (password)
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    return password;

};
/**
 * [authenticate Check Weather password is correct or not]
 * @param  {[string]} password [password Provided By user]
 * @return {[boolean]}          [true on password matches user saved password else false]
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};
/**
 * [findUserMobileNumber This method Will Find User Based on Mobile Number]
 * @param  {[String]} mobile [Mobile Number of user]
 * @return {[Promise]}        [Return Promise to the Caller]
 */

UserSchema.statics.findUserMobileNumber = function(mobile) {
    return this.findOne({
            mobile: mobile
        })
        .select('mobile')
        .exec();
};
/**
 * [findUserByEmail Select The User Based on email Specified]
 * @param  {[email]} userEmail [User Email]
 * @return {[Promise]}           [Returns Promise]
 */
UserSchema.statics.findUserByEmail = function(userEmail) {
    return this.findOne({
            email: userEmail
        })
        .exec();
};
UserSchema.statics.findUserById = function(userId) {
    return this.findOne({
            _id: userId
        })
        .exec()
};
/**
 * [findAllUsers Returns All The Users In Database]
 * @return {[Promise]} [Returns Promise To Caller]
 */
UserSchema.statics.findAllUsers = function() {
    return this.find({})
        .select('-password -salt -resetPasswordToken -resetPasswordExpires -__v')
        .exec();
};
UserSchema.statics.updateUser = function(userId, updatedUser) {
    //Set Updated To Current Date
    updatedUser.updated = new Date();
    return this.findByIdAndUpdate(userId, updatedUser, {
            new: true,
            runValidators: true
        })
        .select('-password -salt -role -resetPasswordToken -resetPasswordExpires -__v')
        .exec()
};
UserSchema.statics.getPasswordResetToken = function(token) {
    return this.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        })
        .exec();

};

module.exports = mongoose.model('User', UserSchema);