import bookingModel from "../Models/bookingModel"
import mongoose from "mongoose";
import { Request, Response } from 'express'
import { IBooking } from "service"
import { IUser } from "service"
import { ISlot } from "service"


//===== validation for object id
const isValidObjectId = function (ObjectId: any) {
    return mongoose.Types.ObjectId.isValid(ObjectId);
};

const isValid = function (value: string) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    return true;
};


//====================================================== slot booking controller =================================================//


const bookSlot = async function (req: Request, res: Response) {

    try {

        let userId = req.params.userId

        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            return res.status(404).send({ status: false, message: "User Not found" })
        }
        //doseType, slotDate, slotTime is required in request body only in first booking

        let data = req.body
        // console.log(data)
        const { doseType, date, time } = data

        if (!isValid(doseType)) {
            return res.status(400).send({ status: false, message: "doseType is required" });
        }

        if (doseType) {
            if (!["First", "Second"].includes(doseType)) {
                return res.status(400).send({ status: false, message: "doseType must be among ['First', 'Second']" });
            }
        }

        //for finding availability of slot from slotmodel
        let findSlot = await slotModel.findOne({ date: date, time: time })
        if (findSlot) {
            let availableSlot = findSlot.availableSlot
            if (availableSlot === 0) {
                return res.status(404).send({ status: false, message: "NO slot available in this time" })
            }
        }


        let findBooking = await bookingModel.findOne({ userId: userId });

        //if user put dose type Second in request body but not found in booking model Or not complected
        if (doseType == "Second") {
            if (!findBooking)
                return res.status(200).send({ status: false, message: "Your First dose is not complected" });
        }
        //if user is already booked a slot then find the booking
        //user can book another slot only if first dose is complected or cancelled
        if (findBooking) {
            const getDoseType = findBooking.doseType
            const getStatus = findBooking.status
            const findbookingId = findBooking._id
            //if first dose cancelled then booking for another slot
            if (getDoseType == "First" && getStatus == "cancelled") {

                let updatedSlot = await bookingModel.findOneAndUpdate({ _id: findbookingId, userId }, { $set: { status: "pending" } }, { new: true });

                if (findSlot) {
                    const slotId = findSlot._id
                    const newbookedSlot = findSlot.bookedSlot
                    let availableSlot = findSlot.availableSlot

                    //finding the slot from slot Id and increasing the bookedSlot to +1 and decrease the available slot to -1
                    await slotModel.findOneAndUpdate({ _id: slotId }, { $set: { bookedSlot: newbookedSlot + 1, availableSlot: availableSlot - 1 } })
                    return res.status(200).send({ status: true, message: "slot booking successfull", data: updatedSlot });
                }
            }
            //if first dose is complected then booking for second dose and update the status
            if (getDoseType == "First" && getStatus == "complected") {

                if (doseType == "First") return res.status(400).send({ status: false, message: "Your First dose is complected" });

                let updatedSlot = await bookingModel.findOneAndUpdate({ _id: findbookingId, userId }, { $set: { status: "pending", doseType: "Second" } }, { new: true });

                if (findSlot) {
                    const slotId = findSlot._id
                    const newbookedSlot = findSlot.bookedSlot
                    let availableSlot = findSlot.availableSlot

                    await slotModel.findOneAndUpdate({ _id: slotId }, { $set: { bookedSlot: newbookedSlot + 1, availableSlot: availableSlot - 1 } })
                    return res.status(200).send({ status: true, message: "slot booking successfull", data: updatedSlot });
                }
            } else {
                return res.status(400).send({ status: false, message: "You already booked a slot" })
            }
        }

        // const dt = new Date(date)
        // const newdt = dt.getTime()

        // const newDate = new Date(newdt).toLocaleDateString()
        // const newTime = new Date(newdt).toLocaleString().split(', ')[1]

        //for new booking and update the slot
        const saveData = {
            userId: userId,
            doseType: doseType,
            slotDate: date,
            slotTime: time
        }

        if (findSlot) {
            const slotId = findSlot._id
            const newbookedSlot = findSlot.bookedSlot
            let availableSlot = findSlot.availableSlot

            await slotModel.findOneAndUpdate({ _id: slotId }, { $set: { bookedSlot: newbookedSlot + 1, availableSlot: availableSlot - 1 } })

            let bookSlot = await bookingModel.create(saveData)
            return res.status(201).send({ status: true, message: "slot booking successfull", data: bookSlot });
        }

    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//======================================= update booking =====================================================================//

//User can cancelled the booking

const updateBooking = async function (req: Request, res: Response) {

    try {

        let userId = req.params.userId;

        let data = req.body
        const { bookingId, status } = data;

        if (!bookingId)
            return res.status(400).send({ status: false, message: "bookingId is required" });

        if (!isValidObjectId(bookingId)) {
            return res.status(400).send({ status: false, message: "Invalid bookingId in body." });
        }

        let findBooking = await bookingModel.findOne({ _id: bookingId, userId });

        if (!findBooking)
            return res.status(404).send({ status: false, message: "booking not found with this UserId and bookingId", });

        if (findBooking && findBooking.status == "cancelled")
            return res.status(400).send({ status: false, message: "cant modify status. as it is already cancelled", })

        if (findBooking && findBooking.status == "complected")
            return res.status(400).send({ status: false, message: "cant modify status. as it is already complected", })


        if (findBooking && findBooking.status == "pending") {
            let updatedBooking = await bookingModel.findOneAndUpdate({ _id: bookingId, userId }, { $set: { status: status } }, { new: true });
            return res.status(200).send({ status: true, message: "slot updated successfully ", data: updatedBooking });
        }

    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




export { bookSlot, updateBooking };

