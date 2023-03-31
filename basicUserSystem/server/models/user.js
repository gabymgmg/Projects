const mongoose = require('mongoose');
//uniqueValidatr to check every field is unique(email)
var uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} is not a valid role' //custom error message
}
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        default: 'USER',
        required: [true, "Role is required"],
        enum: validRoles,

    },
});

// remove the psw in the schema by modifying the toJSON method
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }
 // plugin addition (validates the fields since they need to be unique)
 userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})
module.exports = mongoose.model('User', userSchema)