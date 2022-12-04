import mongoose from "mongoose";


const slotSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: [true, "Date is required"],
            trim: true,
        },
        time: {
            type: String,
            required: [true, "Slot time is required"],
            trim: true
        },
        bookedSlot: {
            type: Number,
            default: 0,
            trim: true
        },
        availableSlot: {
            type: Number,
            default: 10,
            trim: true
        }

    }

);


export default mongoose.model('Slot', slotSchema);