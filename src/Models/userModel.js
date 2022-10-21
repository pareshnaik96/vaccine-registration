const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
     {
        name:{
           type:String,
           required:[true, "name is required"],
           trim:true
        },
        phoneNumber: {
            type: String,
            required: [true, "phone number is required"],
            unique: true,
            trim: true
        },
        age:{
            type:Number,
            required: [true, "age is required"],
            trim: true
        },
        pincode: {
            type: Number,
            required: [true, "pincode is required"],
            trim: true
        },
        aadharNo:{
            type: String,
            required: [true, "aadhar No. is required"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLen: 8,
            maxLen: 15,
            trim: true
        }

    },{ timestamps: true }

 );

 module.exports = mongoose.model('User', userSchema);


