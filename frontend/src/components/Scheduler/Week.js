import React from 'react';
import Day from './Day';

const eventHeight = 25

const Week = ({ dates, events }) => {
  const week = [];
  let trHeight = 100;
  let maxEventSize = 0;

  for (let i = 0; i < 7; i++) {
    const event = events[i];
    const date = dates[i];
    const eventLen = event.length;

    maxEventSize = eventLen > maxEventSize ? eventLen : maxEventSize;

    week.push(<Day key={i} date={date} event={event} dayidx={i} />);
  }
  trHeight =
    eventHeight * maxEventSize + 25 > trHeight
      ? eventHeight * maxEventSize + 25
      : trHeight;
  const styles = {
    height: `${trHeight}px`
  };

  return <tr style={styles}>{week}</tr>;
};

export default Week;