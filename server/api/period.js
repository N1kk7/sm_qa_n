import { defineEventHandler } from "#imports";
// import {uploadSchedule, } from "../services/methods/period";
import uploadSchedule from "../services/methods/period/uploadSchedule";
import uploadAnswers from "../services/methods/period/uploadAnswers";
    


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
            } else if (query.period === 'answers') {
                console.log(1);
                
                return uploadAnswers(event);
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