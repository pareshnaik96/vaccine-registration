import { handlerPath } from '@libs/handler-resolver';
import schema from './schema/schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'log',
        cors: true,
      },
    },
    {
      http: {
        method: 'post',
        path: 'log',
        cors: true,
        // use the below to validate using schema file in the same folder
        request: {
          schemas: {
            'application/json': schema,
          }
        }
      },
    },
    {
      http: {
        method: 'get',
        path: 'log/{id}',
        cors: true,
      },
    },
  ],
};
