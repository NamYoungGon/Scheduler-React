const validator = require('validator')

function isDate(date) {
    let isValid = false
   
    if (validator.toDate(date) !== null)
        isValid = true

    return isValid
}

function isAfter(date, date2) {
    return validator.isAfter(date, date2)
}

module.exports = {
    isDate,
    isAfter
}