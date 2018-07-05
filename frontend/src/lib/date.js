const holidayKR = require('holiday-kr')

function addLeadingZero(value) {
  return (value < 10 ? '0' : '') + value
}

function getDate() {
  const _d = new Date()

  const year = _d.getFullYear()
  const month = _d.getMonth() + 1
  const day = _d.getDate()

  return {
    year,
    month,
    day
  }
}

function getDatetoString() {
  const {
    year,
    month,
    day
  } = getDate()

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`
}

/*
    일요일
    신정 : 양력 1월 1일
    설날 : 음력 1월 1일 및 전후
    3.1절 : 양력 3월 1일
    석가탄신일 : 음력 4월 8일
    어린이날 : 양력 5월 5일
    현충일 : 양력 6월 6일
    광복절 : 양력 8월 15일
    추석 : 음력 8월 15일 및 전후
    개천절 : 양력 10월 3일
    한글날 : 양력 10월 9일
    성탄절 : 양력 12월 25일
*/
const solar = {
  '01-01': {
    name: '신정'
  },
  '03-01': {
    name: '3.1절'
  },
  '05-05': {
    name: '어린이날'
  },
  '06-06': {
    name: '현충일'
  },
  '08-15': {
    name: '광복절'
  },
  '10-03': {
    name: '개천절'
  },
  '10-09': {
    name: '한글날'
  },
  '12-25': {
    name: '성탄절'
  }
}

const lunar = {
  '12-30': {
    name: '설날'
  },
  '01-01': {
    name: '설날'
  },
  '01-02': {
    name: '설날'
  },
  '04-08': {
    name: '석가탄신일'
  },
  '08-14': {
    name: '추석'
  },
  '08-15': {
    name: '추석'
  },
  '08-16': {
    name: '추석'
  }
}

function getDayInfo(year, month, day) {
  const isHoliday = holidayKR.isSolarHoliday(year, month, day)
  let name = ''

  if (isHoliday) {
    if (solar[`${month}-${day}`]) {
      name = solar[`${month}-${day}`].name
    } else {
      const lunarInfo = holidayKR.getLunar(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10))
      const lunarKeyStr = `${addLeadingZero(lunarInfo.month)}-${addLeadingZero(lunarInfo.day)}`

      if (lunar[lunarKeyStr]) {
        name = lunar[lunarKeyStr].name
      }
    }
  }

  return {
    year,
    month,
    day,
    name,
    isHoliday
  }
}

function nextMonth(year, month, day) {
  year = month + 1 === 13 ? year + 1 : year;
  month = month + 1 === 13 ? 1 : month + 1;
  day = 1;

  return {
    year,
    month,
    day
  }
}

function prevMonth(year, month, day) {
  year = month - 1 === 0 ? year - 1 : year;
  month = month - 1 === 0 ? 12 : month - 1;
  day = 1;

  return {
    year,
    month,
    day
  }
}

module.exports = {
  addLeadingZero,
  getDate,
  getDatetoString,
  getDayInfo,
  nextMonth,
  prevMonth
}