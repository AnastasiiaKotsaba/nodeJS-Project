let moment = require('moment')

// 1
function getCurrentDate() {
    console.log(`Today is: ${moment().format('dddd')}`)
}

// 2
function getCurrentMonth() {
    console.log(`Current month is: ${moment().format('MMMM')}`)
}

// 3
function getCurrentYear() {
    console.log(`Current year is: ${moment().format('YYYY')}`)
}

// 4
function getDate(){
    console.log(`Current date is: ${moment().format('YYYY/MM/DD HH:mm:ss')}`)
}

// 5
function getCurrentWeekDay() {
    console.log(`Today is: ${moment().format('dddd')}`)
}

getCurrentDate()
getCurrentMonth()
getCurrentYear()
getCurrentWeekDay()
getDate()