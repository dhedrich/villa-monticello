const scraper = require('insta-scraper')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// scraper.getAccountInfo('hotpinksunrise', function (err, res) {
//     if (err) throw err
//     console.log(res)
// })

app.listen(3000, function (e) {
    if (e) throw e
    console.log("LISTENING ON PORT : 3000")
})