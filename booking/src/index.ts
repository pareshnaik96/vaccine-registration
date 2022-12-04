// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
import route from './Routes/route';
import * as service from "service"


// const app = express();
// app.use(bodyParser.json());


// mongoose.connect("mongodb+srv://pareshnaik:pareshruno@cluster0.pithhzr.mongodb.net/Vaccine-DB?retryWrites=true&w=majority")
//     .then(() => console.log("MongoDb is connected"))
//     .catch(err => console.log(err))


service.app.use('/', route)

service.app.listen(process.env.PORT || 3002, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3002))
});