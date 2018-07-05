import React, { Component } from "react";
import $ from "jquery";
import Week from "./Week";

import { addLeadingZero } from "./../../lib/date";
import { getWeekInfo } from './CalendarBodyAPI';

class CalendarBody extends Component {
  componentDidMount() {
    const that = this;
    const { handleClickOpenEventPopup } = this.props;
    $('.cal-tbody').on('click', 'td', function(e) {
      const date = this.dataset.date;
      const { target } = e;

      if (!target.classList.contains('event-pnl')) {
        handleClickOpenEventPopup({ date });
      } else if (target.className.includes('event-pnl')) {
        const events = that.props.events[date];
        const dvo = parseInt(target.dataset.dvo, 10);
        const eventIndex = events.findIndex((data) => data.dvo === dvo || false);
        const event = events[eventIndex];
        handleClickOpenEventPopup({
          update: event
        });
      }
    });
  }

  render() {
    const { events } = this.props;
    const { year, month } = this.props.date;
    const [initYear, initMonth] = [year, month];
    const date = new Date(year, month - 1, 1);
    const lastDateArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
      lastDateArr[1] = 29;

    const lastDate = lastDateArr[month - 1];
    let prevLastDate;

    const currentDay = date.getDay();
    const totalWeek = Math.ceil((currentDay + lastDate) / 7);

    const newData = [];
    for (let i = 0; i < lastDateArr[month - 1]; i++) {
      newData.push({
        year: String(year),
        month: addLeadingZero(month),
        day: addLeadingZero(i + 1)
      });
    }

    if (currentDay > 0) {
      const newMonth = month - 1 === 0 ? 12 : month - 1;
      const newYear = month - 1 === 0 ? year - 1 : year;

      prevLastDate = lastDateArr[newMonth - 1];
      for (let i = 0; i < currentDay; i++) {
        newData.splice(0, 0, {
          year: String(newYear),
          month: addLeadingZero(newMonth),
          day: addLeadingZero(lastDateArr[newMonth - 1] - i),

          // 이전 달
          pm: true
        });
      }
    }

    const newDataLen = newData.length;
    if (newDataLen % 7 !== 0) {
      const newMonth = month + 1 === 13 ? 1 : month + 1;
      const newYear = month + 1 === 13 ? year + 1 : year;

      // nextLastDate = lastDateArr[newMonth - 1]
      for (let i = 0; i < 7 - (newDataLen % 7); i++) {
        newData.push({
          year: String(newYear),
          month: addLeadingZero(newMonth),
          day: addLeadingZero(1 + i),

          // 다음 달
          nm: true
        });
      }
    }

    const eventGrid = [];

    for (let i = 0; i < totalWeek; i++) {
      eventGrid[i] = [];
      for (let j = 0; j < 7; j++) {
        eventGrid[i][j] = [];
      }
    }

    const { 
      weekDates,
      weekEvents 
    } = getWeekInfo({ 
      eventGrid, 
      totalWeek, 
      newData, 
      events,
      initYear,
      initMonth,
      prevLastDate,
      lastDate
    })

    const calendar = [];
    for (let i = 0; i < totalWeek; i++) {
      calendar.push(
        <Week
          key={i}
          dates={weekDates[i]}
          events={weekEvents[i]}
        />
      );
    }

    return (
      <tbody className="cal-tbody">
        { calendar }
      </tbody>
    )
  }
}

export default CalendarBody;
