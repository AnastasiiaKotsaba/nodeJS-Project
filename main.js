let moment = require('moment')
let express = require('express')
const path = require('path')
const fs = require('fs')

const HOST = '127.0.0.1'
const PORT = 8000

const app = express()


// Posts JSON parse
const PATH = path.join(__dirname, 'posts.json')

const posts = JSON.parse(fs.readFileSync(PATH, 'utf-8'))
// console.log(posts)

// Get date JSON responce
app.get('/timestamp', (req, res) => {
    res.status(200).json({"Current date": getDate()})
})

// Get posts JSON responce
app.get('/posts', (req, res) => {
    res.status(200).json(posts)
})

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
    return moment().format('YYYY/MM/DD HH:mm:ss')
}

// 5
function getCurrentWeekDay() {
    console.log(`Today is: ${moment().format('dddd')}`)
}

app.listen(PORT, HOST, () => {
    console.log(`Server: http://${HOST}:${PORT}`)
})

getCurrentDate()
getCurrentMonth()
getCurrentYear()
getCurrentWeekDay()
getDate()