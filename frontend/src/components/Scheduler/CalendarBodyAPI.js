function getWeekInfo({       
  eventGrid, 
  totalWeek, 
  newData, 
  events,
  initYear,
  initMonth,
  prevLastDate,
  lastDate
}) {
  const weekDates = [];
  const weekEvents = [];

  let weekDate;
  let weekEvent;
  let continueEvent;

  for (let i = 0; i < totalWeek; i++) {
    weekDate = newData.slice(i * 7, (i + 1) * 7);
    weekDates.push(weekDate);

    weekEvent = new Array(7);
    weekEvent.fill([]);

    continueEvent = {};

    for (let j = 0; j < 7; j++) {
      const { year, month, day } = weekDate[j];
      const dateStr = `${year}-${month}-${day}`;
      const eventGridCell = eventGrid[i][j];

      if (events[dateStr]) {
        const eventArr = events[dateStr];
        const eventsLen = eventArr.length;

        for (let k = 0; k < eventsLen; k++) {
          const event = eventArr[k];
          const { startDate, endDate, dvo } = event;

          if (continueEvent[dvo]) continue;

          // continue event
          if (startDate !== endDate) {
            const [startYear, startMonth, startDay] = [year, month, day];
            let [endYear, endMonth, endDay] = endDate.split("-");
            let diff;

            if (startYear === endYear && startMonth === endMonth) {
              if (parseInt(startDay, 10) + 7 - j - 1 < parseInt(endDay, 10)) {
                endDay = parseInt(startDay, 10) + 7 - j - 1;
              }

              diff = parseInt(endDay, 10) - parseInt(startDay, 10) + 1;
            } else {
              let diffLastDate;
              if (
                parseInt(startYear, 10) < initYear ||
                parseInt(startMonth, 10) < initMonth
              ) {
                diffLastDate = prevLastDate;
              } else {
                diffLastDate = lastDate;
              }

              diff =
                diffLastDate - parseInt(startDay, 10) + parseInt(endDay, 10);
              if (diff + j > 7 - j) {
                diff = 7 - j;
              } else {
                diff = diff + 1;
              }
            }

            event.display = true;
            event.width = diff;
            continueEvent[dvo] = true;

            let isFind = false;
            let row = 0;
            let eventGridCellLen = eventGridCell.length;

            for (let index = 0; index < eventGridCellLen; index++) {
              if (!eventGridCell[index]) {
                let isBreak = false;
                for (let l = 0, tmpEventGridCell; l < diff; l++) {
                  tmpEventGridCell = eventGrid[i][j + l];
                  if (tmpEventGridCell[index]) {
                    isBreak = true;
                    break;
                  }
                }

                if (isBreak) break;

                for (let l = 0, tmpEventGridCell; l < diff; l++) {
                  tmpEventGridCell = eventGrid[i][j + l];
                  tmpEventGridCell[index] = true;
                }

                isFind = true;
                row = index;
              }
            }

            if (!isFind) {
              let index;
              for (let l = 0, tmpEventGridCell; l < diff; l++) {
                tmpEventGridCell = eventGrid[i][j + l];
                if (tmpEventGridCell[eventGridCellLen + l]) {
                  continue;
                }

                index = eventGridCellLen + l;
                break;
              }

              for (let l = 0, tmpEventGridCell; l < diff; l++) {
                tmpEventGridCell = eventGrid[i][j + l];
                tmpEventGridCell[index] = true;
              }

              row = index;
            }

            event.row = row;
          } else {
            let isFind = false;
            let row = 0;
            let eventGridCellLen = eventGridCell.length;

            for (let index = 0; index < eventGridCellLen; index++) {
              if (!eventGridCell[index]) {
                isFind = true;
                eventGridCell[index] = true;
                row = index;

                break;
              }
            }

            if (!isFind) {
              eventGridCell[eventGridCellLen] = true;
              row = eventGridCellLen;
            }

            event.display = true;
            event.width = 1;
            event.row = row;
          }

          // let tmpColor = users.findIndex((tmpData, index) => {
          //   if (tmpData.no !== parseInt(event.who, 10)) return false;
          //   return true;
          // });

          // event.color = users[tmpColor].color;
        }

        weekEvent[j] = eventArr;
      }
    }

    weekEvents.push(weekEvent);
  }

  return {
    weekDates,
    weekEvents
  }
}

module.exports = {
  getWeekInfo
}