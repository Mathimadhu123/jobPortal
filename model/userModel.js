const mongoose = require('mongoose');
const validate = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter your name"]
    },
    email: {
        type:String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validate.isEmail
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "passsword must be 6 characters"],
    },
    role: {
        type: String,
        required:[ true, "Please enter role to continue"],
        enum:['jobseeker', 'employer', 'admin'],
        default: 'jobseeker',
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');
