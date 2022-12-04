// import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse, successJSONResponse } from '@libs/api-gateway';
// import { middyfy } from '@libs/lambda';

// import schema from './schema';

// const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
//   return successJSONResponse({
//     message: `Hello ${event.body.phone}, hello from login!`,
//   });
// };


// export const main = middyfy(login); //use middyfy for request validation
// // use "schema.ts" file in fn folder to write schema

import express from 'express'
import { getLogin, postLogin, postPOSTLogin } from './controller/controller';
import { isAuthor } from './middleware/middle'
import serverless from 'serverless-http'


const app = express()
app.use(express.json());


// ROUTES:
app.get('/log', getLogin)

app.post('/log', postLogin)

app.get('/log/:id', isAuthor, postPOSTLogin)




export const main = serverless(app)
