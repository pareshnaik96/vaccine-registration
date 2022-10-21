const slotModel = require("../Models/slotModel");
const userModel = require("../Models/userModel");

const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    return true;
  };


//================================================== slot booking controller ====================================================//


const createSlot = async function(req,res){

    try{
       
       let data = req.body
       
       let userId = req.params.adminId


       const { slotDate,slotTime,totalSlot } = data;


       if (!isValid(slotDate)) {
        return res.status(400).send({ status: false, message: "slotDate is required" });
       }
       if (!isValid(slotTime)) {
        return res.status(400).send({ status: false, message: "slotTime is required" });
       }
       if (!isValid(totalSlot)) {
        return res.status(400).send({ status: false, message: "totalSlot is required" });
       }

       let findAdmin = await userModel.findOne({_id:userId})
       const name = "Admin"
       const adminName = findAdmin.name
       if(adminName !== name){
          return res.status(404).send({ status: true, message: "Admin Not found. you are unauthorized"});
       }

       const AdminId = findAdmin._id
       if (AdminId != userId) return res.status(401).send({ status: false, message: "userId of admin not matched with Admin,unauthorized" })

       let createSlot = await slotModel.create(data)
          return res.status(201).send({ status: true, message: "Slot created successfully", data:createSlot });

    }catch(error){
        return res.status(500).send({ status: false, message: error.message });
    }
}

//===================================================== get slot controller =====================================================//

const getSlot = async function (req, res) {

    try {

        let data = req.query
        let { slotDate,  slotTime } = data


        let filter = {availableSlot:{$gt:0}}


        if (isValid(slotDate)) {
            filter["slotDate"] = slotDate
        }

        if (isValid(slotTime)) {
            filter["slotTime"] = slotTime
        }

        let avaliableSlot = await slotModel.find(filter).select({_id:0, slotDate:1,slotTime:1,totalSlot:1,bookedSlot:1,availableSlot:1 })

        if (avaliableSlot && avaliableSlot.length === 0)
            return res.status(404).send({ status: false, message: "No slot avaliable" })

        return res.status(200).send({ status: true, message: "slot list accessed successfully", data: avaliableSlot })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}


module.exports.createSlot = createSlot
module.exports.getSlot = getSlot

