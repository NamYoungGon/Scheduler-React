import React, { Component, Fragment } from 'react';

import Header from './Header';
import Calendar from './Calendar';
import CalendarBody from './CalendarBody';
import EventPopup from './EventPopup';
import ColorPickerPopup from './ColorPickerPopup';
import { setPopup, dimmerClick } from './../../lib/popup';
import { addLeadingZero, getDate, nextMonth, prevMonth } from './../../lib/date';
import { isDate, isAfter } from './../../lib/validate';

// const data = {
//     '2017-12-27': [
//         {
//             dvo: 1514362423935,
//             who: 'Nam',
//             startDate: '2017-12-27',
//             endDate: '2017-12-27',
//             summary: 'Nam'
//         },
//         {
//             dvo: 1514362444722,
//             who: 'Young',
//             startDate: '2017-12-27',
//             endDate: '2017-12-27',
//             summary: 'Young'
//         }
//     ]
// }

class SchedulerContainer extends Component {
  state = {
    date: {
      year: '',
      month: '',
      day: ''
    },
    colorPicker: {
      color: '#fff',
      idx: -1
    },
    event: {
      startDate: '',
      endDate: '',
      summary: '',
      color: '#fff'
    },
    events: {},
    popup: {
      display: false,
      type: 'add' // update 
    }
  }

  componentDidMount = () => {
    const { year, month, day } = getDate();
    
    this.setState({ date: { year, month, day } })
  }

  handlePrevMonth = () => {
    let date = this.state.date;
    let { year, month, day } = prevMonth(date.year, date.month, date.day)
    this.setState({ date: { year, month, day } });
  }

  handleNextMonth = () => {
    let date = this.state.date;
    let { year, month, day } = nextMonth(date.year, date.month, date.day)
    this.setState({ date: { year, month, day } });
  }

  handleClickOpenEventPopup = (setting = {}) => {
    const { date, update } = setting;

    this.clearEventInput();
    setPopup("popup-add-event", true);

    let stateData;

    if (date) {
      stateData = {
        event: {
          ...this.state.event,
          startDate: date,
          endDate: date
        },
        colorPicker: {
          color: '#fff'
        },
        popup: {
          display: true,
          type: 'add'
        }
      };
    } else if (update) {
      let { startDate, endDate, color, dvo } = update;
      stateData = {
        event: update,
        popup: {
          startDate,
          endDate,
          dvo,
          display: true,
          type: 'update',
        },
        colorPicker: {
          color
        }
      };
    } else {
      stateData = {
        popup: {
          display: false,
          type: 'add'
        }
      };
    }

    this.setState(stateData);
  };

  handleClickSaveEvent = () => {
    const { event, popup, colorPicker } = this.state;
    const { startDate, endDate, summary, dvo } = event;
    const { type = 'add' } = popup;

    if (isDate(startDate) === false || isDate(endDate) === false) {
      alert('날짜를 입력하세요.');
      return false;
    }

    if (isAfter(startDate, endDate)) {
      alert('뒤 날짜가 앞 날짜보다 빠를 수 없습니다.');
      return false;
    }

    if (summary.trim() === '') {
      alert('제목을 입력하세요.');
      return false;
    }

    let [startYear, startMonth, startDay] = startDate.split("-");
    let initStartYear = parseInt(startYear, 10);
    let initStartMonth = parseInt(startMonth, 10);
    let initStartDay = parseInt(startDay, 10);
    let [endYear, endMonth, endDay] = endDate.split("-");
    let initEndYear = parseInt(endYear, 10);
    let initEndMonth = parseInt(endMonth, 10);
    let initEndDay = parseInt(endDay, 10);

    let newEvent = {
      startDate,
      endDate,
      summary,
      color: colorPicker.color,
      dvo: dvo || new Date().valueOf()
    };

    if (type === 'update') {
      this.deleteEvent(false);
    }

    const cloneEvents = {
      ...this.state.events
    }
    const lastDateArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let iYear = initStartYear; iYear <= initEndYear; iYear++) {
      if ((iYear % 4 === 0 && iYear % 100 !== 0) || iYear % 400 === 0)
        lastDateArr[1] = 29;

      let jMonth = initStartYear === iYear ? initStartMonth : 1;
      let jEndMonth = initEndYear === iYear ? initEndMonth : 12;
      for (; jMonth <= jEndMonth; jMonth++) {
        let kDay = initStartYear === iYear && initStartMonth === jMonth ? initStartDay : 1;
        let kEndDay = initEndYear === iYear && initEndMonth === jMonth ? initEndDay : lastDateArr[jMonth - 1];
        for (; kDay <= kEndDay; kDay++) {
          let completeDate = `${iYear}-${addLeadingZero(jMonth)}-${addLeadingZero(kDay)}`;

          if (!cloneEvents[completeDate]) 
            cloneEvents[completeDate] = [];

          cloneEvents[completeDate].push({ ...newEvent })
        }
      }
    }

    this.setState({
      events: cloneEvents,
      popup: {
        display: false,
        type: 'add'
      },
      colorPicker: {
        color: '#fff'
      }
    });

    setPopup('popup-add-event', false);
    this.clearEventInput();
  };

  deleteEvent = (render = true) => {
    const { events, popup } = this.state;
    const { startDate, endDate, dvo } = popup;

    let [startYear, startMonth, startDay] = startDate.split("-");
    let initStartYear = parseInt(startYear, 10);
    let initStartMonth = parseInt(startMonth, 10);
    let initStartDay = parseInt(startDay, 10);
    let [endYear, endMonth, endDay] = endDate.split("-");
    let initEndYear = parseInt(endYear, 10);
    let initEndMonth = parseInt(endMonth, 10);
    let initEndDay = parseInt(endDay, 10);
    let newEvents = {};

    const lastDateArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let iYear = initStartYear; iYear <= initEndYear; iYear++) {
      if ((iYear % 4 === 0 && iYear % 100 !== 0) || iYear % 400 === 0)
        lastDateArr[1] = 29;

      let jMonth = initStartYear === iYear ? initStartMonth : 1;
      let jEndMonth = initEndYear === iYear ? initEndMonth : 12;
      for (; jMonth <= jEndMonth; jMonth++) {
        let kDay = initStartYear === iYear && initStartMonth === jMonth ? initStartDay : 1;
        let kEndDay = initEndYear === iYear && initEndMonth === jMonth ? initEndDay : lastDateArr[jMonth - 1];
        for (; kDay <= kEndDay; kDay++) {
          let completeDate = `${iYear}-${addLeadingZero(jMonth)}-${addLeadingZero(kDay)}`;
          const index = events[completeDate].findIndex(data => data.dvo === dvo)
     
          if (render === false) {
            events[completeDate].splice(index, 1);
          } else {
            events[completeDate].splice(index, 1);
          }
        }
      }
    }

    if (render === true) {
      this.setState({
        events: newEvents,
        popup: {
          display: false,
          type: 'update'
        }
      });
    }
  };

  handleClickDeleteEvent = () => {
    this.deleteEvent();
    setPopup('popup-add-event', false);
    this.clearEventInput();
  };

  handleClickCloseEventPopup = () => {
    this.setState({
      popup: {
        display: false,
        type: 'add'
      }
    });

    setPopup('popup-add-event', false);
  };

  handleChangeInput = e => {
    const { name, value } = e.target

    this.setState(prevState => {
      return {
        ...prevState,
        event: {
          ...prevState.event,
          [name]: value
        }
      }
    })
  }

  clearEventInput = () => {
    this.setState({
      event: {
        startDate: '',
        endDate: '',
        summary: ''
      }
    });
  };

  handleClickOpenColorPicker = e => {
    const color = e.target.style.backgroundColor

    this.setState({ colorPicker: { color } });

    setPopup('popup-color-picker', true);

    dimmerClick(() => setPopup('popup-color-picker', false));
  };

  handleChangeColor = color => {
    this.setState(prevState => {
      return {
        colorPicker: {
          color: color.hex
        }
      }
    })
  };

  render() {
    const { popup, event, colorPicker, date, events } = this.state;
    const { year, month } = date;
    const { 
      handlePrevMonth, 
      handleNextMonth,
      handleChangeInput, 
      handleClickSaveEvent, 
      handleClickDeleteEvent, 
      handleClickCloseEventPopup, 
      handleChangeColor,
      handleClickOpenEventPopup,
      handleClickOpenColorPicker
    } = this;
    const { startDate, endDate, summary } = event;

    return (
      <Fragment>
        <Header 
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth} 
          handleClickOpenEventPopup={handleClickOpenEventPopup}
          year={year}
          month={month}
        />
        <Calendar>
          <CalendarBody
            date={date}
            events={events}
            handleClickOpenEventPopup={handleClickOpenEventPopup}
          />
        </Calendar>
        <EventPopup 
          startDate={startDate} 
          endDate={endDate} 
          summary={summary} 
          type={popup.type}
          color={colorPicker.color}
          handleChangeInput={handleChangeInput}
          handleClickSaveEvent={handleClickSaveEvent} 
          handleClickDeleteEvent={handleClickDeleteEvent}
          handleClickCloseEventPopup={handleClickCloseEventPopup}
          handleClickOpenColorPicker={handleClickOpenColorPicker}
        />
        <ColorPickerPopup 
          color={colorPicker.color}
          handleChangeColor={handleChangeColor}
        />
        <div className="dimmer" tabIndex="0" aria-hidden="true" />
      </Fragment>
    );
  }
}

export default SchedulerContainer;
