import prisma from '../../../../prisma/prisma';
import { readMultipartFormData } from '#imports';
import { chunk } from 'lodash'




async function uploadAnswers(event) {

    try{

        console.log(2);
        

        const formData = await readMultipartFormData(event);

        if (!formData) {
            return { message: 'no data' }
        }


        const parsedData = formData.map((item) => JSON.parse(item.data.toString()));

        console.log(parsedData, 'parsedData')

    } catch (err) {

        console.log('Something went wrong', err.message)
    }

}



export default uploadAnswers;