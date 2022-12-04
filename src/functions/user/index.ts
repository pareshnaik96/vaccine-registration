// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import route from './Routes/route';
// import { app } from "service"

// import * as dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());


// mongoose.connect("mongodb+srv://pareshnaik:pareshruno@cluster0.pithhzr.mongodb.net/Vaccine-DB?retryWrites=true&w=majority")
//     .then(() => console.log("MongoDb is connected"))
//     .catch(err => console.log(err))


// app.use('/', route)

// app.listen(process.env.PORT || 3000, function () {
//     console.log('Express app running on port ' + (process.env.PORT || 3000))
// });

import model from './registerModel';

import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'register',
                request: {
                    schemas: {
                        'application/json': model,
                    },
                },
            },
        },
        {
            http: {
                method: 'post',
                path: 'login',
                request: {
                    schemas: {
                        'application/json': model,
                    },
                },
            },
        },
    ],
};