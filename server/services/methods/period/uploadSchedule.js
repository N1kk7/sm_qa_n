import prisma from '../../../../prisma/prisma';
import { readMultipartFormData } from '#imports';
import { chunk } from 'lodash'
import supabase from '#supabase'

const chunkSize = 100;

async function uploadSchedule(event) {

    try {

        const formData = await readMultipartFormData(event);

        if (!formData) {
            return { message: 'no data' }
        }


        const parsedData = formData.map((item) => JSON.parse(item.data.toString()));

        const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;


        const dateKeys = Object.keys(parsedData[0]).filter(key => dateRegex.test(key));

        const periodData = {
            startData: dateKeys[0],
            endData: dateKeys[dateKeys.length - 1]
        }
        // console.log(periodData.startData, periodData.endData, 'dateKeys')
        const uploadPeriod = await prisma.period.create({
            data: {
                startDate: new Date(periodData.startData),
                endDate: new Date(periodData.endData)
            }
        })


        // const uploadSchedule =

       

        // const uploadEmploye = await prisma.employee.createMany({
        //     data: employee
        // })

        const periodId = uploadPeriod.id;

        const employeeData = parsedData.map((item) => ({
            name: item.Name,
            position: item.Position,
            email: item.Email,
            periodId: periodId
        }))

        await prisma.employee.createMany({
            data: employeeData,
            skipDuplicates: true
        })

        const createdEmployees = await prisma.employee.findMany({
            where: {
                periodId: periodId
            }
        })

        let scheduleArr = [];

        parsedData.forEach((item, idx) => {

            const employeeId = createdEmployees[idx]?.id

            if (!employeeId) return;

            const dateKeys = Object.keys(item).filter(key => dateRegex.test(key));

            // console.log(employeeId, 'employeeId')

            dateKeys.forEach((key) => {

                const date = new Date(key);
                const formattedDate = date.toLocaleDateString('fr-CA');

                const separateKey = item[key].match(/^(.+?)\s*(\((.+)\))?$/);

                const workShift = separateKey ? separateKey[1].trim() : '';
                const shiftPosition = separateKey && separateKey[3] ? separateKey[3].trim() : '';


                scheduleArr.push({
                    employeeId: employeeId,
                    date: formattedDate,
                    workShift: workShift,
                    shiftPosition: shiftPosition,
                })
            })

            // item.forEach((i) => {

            // })

            // let dateKeys = Object.keys(item).filter(key => dateRegex.test(key))
            // let dateValue = Object.values(item).filter(key => dateRegex.test(key))

            // dateKeys.forEach((key, idx) => {
            //     scheduleArr.push({
            //         employeeId: createdEmployees[idx].id,
            //         date: key,
            //         shift: dateValue[idx]
            //     })
            // })

            // scheduleArr.push({
            //     employeeId: createdEmployees[idx].id,
            //     dates: item[idx]
            // })
            // const date = item.map((d) => Object.keys(item).filter(key => dateRegex.test(key)))
            // date: 
            // return {
            //     employeeId: createdEmployees[idx].id,
            // }
        })

        async function insertScheduleChunk(data) {
            const chunks = [];


            for (let i = 0; i < data.length; i += chunkSize) {
                chunks.push(data.slice(i, i + chunkSize));
            }

            for (const batch of chunks) {
                try {
                    await prisma.schedule.createMany({
                        data: batch,
                        skipDuplicates: true

                    })

                    // console.log('inserted chunk');
                    


                } catch (err) {
                    console.error('Error insert schedule', err.message)
                }

            }
        }

        await insertScheduleChunk(scheduleArr);



        // const uploadSchedule = await prisma.schedule.createMany({
        //     data: scheduleArr,
        //     skipDuplicates: true
        // })
        // console.log

        return {
            data: scheduleArr,
            periodId: periodId,
        }

        // console.log()

        // const employeeSchedule = parsedData.map((item) => {

        // })
        // return {data: uploadPeriod}

    } catch (err) {
        return {
            success: false,
            data: {
                message: err.message
            }
        }
    }

}

export default uploadSchedule