import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

import { read, utils } from 'xlsx'

export const useDataStore = defineStore('data', () => {
  const data = reactive({});
  const currentEmployee = reactive({});
  const currentAnswers = reactive([]);

  const ExcelToJSON = function (e, variant) {
    const file = e.target.files[0];

    let reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = (e) => {
      let workbook = read(e.target.result, {
        type: 'binary',
        cellDates: true,
        cellNF: false,
        cellText: false
      });

      const options = {
        raw: false,
        dateNF:"yyyy-mm-dd hh:mm:ss"
      };

      workbook.SheetNames.forEach(function (sheetName) {
        let XL_row_object = utils.sheet_to_json(workbook.Sheets[sheetName], options);

        if (variant === 'schedule') {
          data.scheduleObj = XL_row_object.filter((obj) => {
            return obj.Position === 'Social Media Support Expert (secondary)' || obj.Position === 'Social Media Support Expert'
          })
        } else if (variant === 'answers') {
          const repliedOnly = XL_row_object.filter((obj) => {
            return (
              obj['Reply Status'] === 'Yes'
            )
          })

          const filtered = repliedOnly.filter((obj) => {
            return (obj['Task Assignee'] !== 'Den Kislinskiy' || obj['Replied By'] !== 'Den Kislinskiy')
          })

          data.answersObj = filtered

          const uploadData = async () => {
            if (!data.length) {
                console.log('no data')
            }

            try {

                if (!data.scheduleObj?.length) {
                    alert('Please put file with schedule');
                    return;
                };

                const fromData = new FormData();

                data.scheduleObj.forEach((item) => {
                    fromData.append('schedule[]', JSON.stringify(item));
                })

                const fetchSchedule = await fetch('/api/period', {
                    method: 'POST',
                    body: fromData
                })

                const res = await fetchSchedule.json();

                console.log(res, 'fetchSchedule')


            } catch (err) {
                console.log(err)
            }
          }

          uploadData()
        }
      })
    }

    reader.onerror = function (ex) {
      console.log(ex)
    }
  };

  const setCurrentEmployee = (employee, index) => {
    const regex = /\d/;

    const employeeWorkingDates = [...Object.keys(employee)].filter((item) => {
      if (
          item !== 'Name' &&
          item !== 'Org Unit' &&
          item !== 'Position' &&
          item !== 'Email'
      ) {
          return (
            employee[item].match(regex)
          );
        }
    });

    const employeeSchedule = employeeWorkingDates.map((item) => {
      return {
          shiftDate: item,
          shiftTime: employee[item]
      }
    });

    currentEmployee.value = employeeSchedule;
    currentEmployee.index = index;

    setCurrentEmployeeAnswers(employeeSchedule);
  }

  const setCurrentEmployeeAnswers = (employeeShifts) => {
    const regExp = /[a-zA-Z]/g;

    currentAnswers.length = 0

    employeeShifts.forEach((item) => {
      const incomingTimeArray = item.shiftTime?.split(' ');
      const regex = /\d/;
      const timeFilteredArray = incomingTimeArray.filter((item) => {
        return item.match(regex);
      })

      const timeMin = timeFilteredArray[0]?.split(':')[0];
      const timeMax = timeFilteredArray[1]?.split(':')[0] === '00' ? '24' : timeFilteredArray[1]?.split(':')[0];

      const scheduleDate = new Date(item.shiftDate).toLocaleDateString();

      let oneShiftAnswers = data.answersObj.filter((elem) => {
        let completed;

        if (elem['Task Status'] === 'Tasked') {
            completed = elem['First Reply Timestamp'];
        } else {
            completed = elem['Completed Timestamp'];
        }

        if (!completed || regExp.test(completed)) {
            return false;
        }

        const completedArray = completed?.split(' ');

        const date = new Date(completedArray[0]).toLocaleDateString();
        const time = Number(completedArray[1]?.split(':')[0]);

        if (date && time) {
          if (scheduleDate === date && time >= timeMin && time <= timeMax) {
            return elem;
          }
        }
      });

      currentAnswers.push({
        date: item,
        answers: oneShiftAnswers
      });
    });
  }

  const getCurrentEmployee = computed(() => {
    return currentEmployee
  })

  const getCurrentAnswers = computed(() => {
    return currentAnswers
  })


  return {
    data,
    ExcelToJSON,
    currentEmployee,
    setCurrentEmployee,
    getCurrentEmployee,
    currentAnswers,
    setCurrentEmployeeAnswers,
    getCurrentAnswers
  }
})