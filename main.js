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
    const skip = req.query.skip
    const take = req.query.take

    let postCopys = [...posts]

    // skip
	if (skip) {
		const numSkip = Number(skip)
		if (isNaN(numSkip)) {
			res.status(400).json("query skip must be a number")
			return
		}
		postCopys = posts.slice(numSkip)
	}

    // take
    if (take) {
        const numTake = Number(take)
        if (isNaN(numTake)) {
            res.status(400).json("query take must be a number")
            return
        }
        postCopys = postCopys.slice(0, numTake)
    }
    res.status(200).json(postCopys)
})


app.get("/posts/:id", (req, res) => {
	const id = Number(req.params.id)
	
	if (isNaN(id)){
		res.status(400).json('id must be a number')
		return
	}

    if (!onePost){
        res.status(404).json('post was not found')
        return
    }
    
	const onePost = posts.find((post) => {
		return id === post.id
	})

	res.status(200).json(onePost)
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