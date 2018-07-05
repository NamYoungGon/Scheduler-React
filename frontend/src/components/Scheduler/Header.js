import React from 'react';
import { addLeadingZero } from "./../../lib/date";

const Header = ({ handlePrevMonth, handleNextMonth, handleClickOpenEventPopup, year, month }) => {
  return (
    <div className="header">
      <button className="b-lv-3" onClick={handlePrevMonth}>
        ◀
      </button>
      <div className="f-lv-2">
        {year} {addLeadingZero(month)}
      </div>
      <button className="b-lv-3" onClick={handleNextMonth}>
        ▶
      </button>
      <button
        className="b-lv-2 open-event-popup"
        onClick={handleClickOpenEventPopup}
      >
        일정 추가
      </button>
    </div>
  );
};

export default Header;