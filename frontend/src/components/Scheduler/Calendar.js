import React from 'react';

const Calendar = ({ children }) => {
  return (
    <div className="cal-wrap">
      <div className="cal-pnl">
        <div className="cal-outer-pnl">
          <div className="cal-inner-pnl">
            <div className="cal-table">
              <table>
                <colgroup>
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>일</th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <th>토</th>
                  </tr>
                </thead>
                { children }
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;