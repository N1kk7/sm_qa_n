import prisma from '../../../../prisma/prisma';
import { readMultipartFormData } from '#imports';
import { chunk } from 'lodash'

const chunkSize = 100;




async function uploadAnswers(event) {

    try{

        // console.log(2);
        const formData = await readMultipartFormData(event);

        if (!formData) {
            return { message: 'no data' }
        }


        const parsedData = formData.map((item) => JSON.parse(item.data.toString()));

        async function insertAnswersChunk(data) {
            const chunks = [];


            for (let i = 0; i < data.length; i += chunkSize) {
                chunks.push(data.slice(i, i + chunkSize));
            }

            for (const batch of chunks) {
                try {
                    await prisma.tweet.createMany({
                        data: batch,
                        skipDuplicates: true

                    })

                    // console.log('inserted chunk');
                    


                } catch (err) {
                    console.error('Error insert answers', err.message)
                }

            }
        }

        await insertAnswersChunk(parsedData);

        return {
            message: 'answers uploaded successfully'
        }

        // console.log(parsedData, 'parsedData')

    } catch (err) {

        console.log('Something went wrong', err.message)
    }

}



export default uploadAnswers;