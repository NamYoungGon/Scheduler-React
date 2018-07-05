import React from 'react';
import { getDatetoString } from "./../../lib/date";

const EventPopup = ({
  startDate,
  endDate,
  summary,
  type,
  color,
  handleChangeInput,
  handleClickSaveEvent,
  handleClickDeleteEvent,
  handleClickCloseEventPopup,
  handleClickOpenColorPicker
}) => {
  const styles = {
    height: '32px',
    backgroundColor: color
  };

  if (startDate === '') {
    startDate = endDate = getDatetoString();
  }

  return (
    <div className="popup popup-scheduler" id="popup-add-event">
      <div className="popup-inner">
        <div className="popup-title">
          <h3>{type}</h3>
        </div>
        <div className="popup-content">
          <div className="field-group t-r">
            <label>기간</label>
            <div className="t-l">
              <input
                type="date"
                name="startDate"
                className="date"
                value={startDate}
                onChange={handleChangeInput}
              />{" "}
              to{" "}
              <input
                type="date"
                name="endDate"
                className="date"
                value={endDate}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="field-group t-r">
            <label>제목</label>
            <input
              type="text"
              name="summary"
              value={summary}
              onChange={handleChangeInput}
            />
          </div>
          <div className="field-group t-r">
            <label>색상</label>
            <div
              className="user-event-color"
              style={styles}
              onClick={handleClickOpenColorPicker}
            />
          </div>
        </div>
        <div className="popup-footer">
          <div className="popup-footer-inner">
            <div className="t-r">
              <button onClick={handleClickSaveEvent}>저장</button>
              {type === "update" ? (
                <button className="important" onClick={handleClickDeleteEvent}>
                  삭제
                </button>
              ) : null}
              <button onClick={handleClickCloseEventPopup}>닫기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
