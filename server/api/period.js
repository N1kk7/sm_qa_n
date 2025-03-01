import { defineEventHandler } from "#imports";
import uploadSchedule from "../services/methods/period/uploadSchedule";
    


export default defineEventHandler((event) => {
    const method = event.node.req.method;
    const query = getQuery(event);

    console.log(query.period, 'query')

    switch (method) {
        case 'GET':
            return console.log(1);
        break;

        case 'POST': 
            if (query.period === 'schedule') {
                return uploadSchedule(event);
            }
            // return {
            //     success: true,
            //     data: {
            //         message: 'success',
            //         value: 1
            //     }
            // };

        break;

        case 'PUT':
            return console.log(1);

        break;

        case 'DELETE':
            return console.log(1);

        break;
        // default:

        //     throw createError({
        //         statusCode: 405,
        //         statusMessage: 'Method Not Allowed'
        //     })
        // break;
    }
})