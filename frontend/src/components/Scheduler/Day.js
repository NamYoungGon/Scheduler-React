import React from 'react';
import { getDayInfo } from './../../lib/date';

const eventHeight = 25
const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토']

const Day = ({ date, event, dayidx }) => {
  const { year, month, day, pm, nm } = date;
  const dataDate = `${year}-${month}-${day}`;
  const dayClass = pm || nm ? "dim" : "";
  const eventRender = [];

  let tdClass = "";
  let dayName = "";
  tdClass = `cal-${dayOfWeek[dayidx].toLowerCase()}`;
  const dayInfo = getDayInfo(year, month, day);
  if (dayInfo.isHoliday && dayInfo.name) {
    tdClass += " cal-hol";
    dayName = <span className="cal-day-name">{dayInfo.name}</span>;
  }
  // tdClass += isSolarHoliday(year, month, day) ? ' cal-hol' : ''

  event.forEach((data, index) => {
    const { summary, display, width, row, color, dvo } = data;

    if (!display) return true;

    let classStr = `event-${width}-7 event-pnl`;
    let styles = {
      top: row * eventHeight + "px",
      backgroundColor: color
    };
    eventRender.push(
      <div className={classStr} data-dvo={dvo} style={styles} key={index}>
        {summary}
      </div>
    );
  });
  return (
    <td className={tdClass} data-date={dataDate}>
      <p className="cal-day">
        <span className={dayClass}>{day}</span>
        {dayName}
      </p>
      {eventRender}
    </td>
  );
};

export default Day;