const scraper = require('insta-scraper')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// scraper.getAccountInfo('hotpinksunrise', function (err, res) {
//     if (err) throw err
//     console.log(res)
// })

app.listen(PORT, function (e) {
    if (e) throw e
    console.log(`LISTENING ON PORT : ${PORT}`)
})