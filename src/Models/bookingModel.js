const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId


const bookingSchema = new mongoose.Schema(
     {  
        userId: {
            type: ObjectId,
            required: [true, "userId is required"],
            refs: 'User',
            trim: true
        },
        doseType: {
            type: String,
            required: [true, "doseType is required"],
            enum: ["None", "First", "Second"],
            trim: true
        },
        slotDate:{
            type:String,
            required: [true, "slot Date is required"],
            trim:true,
        },
        slotTime: {
            type: String,
            required: [true, "Slot time is required"],
            trim: true
        },
        status: {
            type: String,
            enum:["pending", "completed", "cancelled"],
            default: "pending"
        },
        cancellable: {
            type: Boolean,
            default:true
        }

    },{ timestamps: true }

 );

 module.exports = mongoose.model('Booking', bookingSchema);