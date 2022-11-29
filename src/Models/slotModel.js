const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
     {
        slotDate:{
            type:String,
            required: [true, "Date is required"],
            trim:true,
        },
        slotTime: {
            type: String,
            required: [true, "Slot time is required"],
            trim: true
        },
        totalSlot: {
            type: Number,
            required: [true, "Total slot is required"],
            trim: true
        },
        bookedSlot: {
            type: Number,
            default:0,
            trim: true
        },
        availableSlot: {
            type: Number,
            default:10,
            trim: true
        }

    },{ timestamps: true }

 );

 module.exports = mongoose.model('Slot', slotSchema);