var express = require('express')
var app = express()
var request = require('request')
var _ = require('lodash')

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + "/build"))

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/build/index.html')
})

app.get('/api/cities', (req, resp) => {
    var url = "http://api.travelpayouts.com/data/cities.json?token=37813cee19f8d2cc2635c26382fddb24"
    var destinationCity = req.query.destinationCity
    request(url, (error, response, body) => {
        var data = JSON.parse(body)

        var toCity = _.find(data, (el) => {
            var ru = el.name_translations.ru
            if (ru === undefined) { return false}
            return ru.toUpperCase() === destinationCity.toUpperCase()
        })
        if (toCity === undefined) {
            resp.send({
                error: "Not found",
            })
            return
        }
        var destinationCode = toCity.code
        var englishName = toCity.name_translations.en

        var moscowCode = _.find(data, (el) => {return el.name_translations.ru === "Москва"}).code
        var piterCode = _.find(data, (el) => {return el.name_translations.ru === "Санкт-Петербург"}).code
        var kazanCode = _.find(data, (el) => {return el.name_translations.ru === "Казань"}).code

        var respJson = {
            moscowCode: moscowCode,
            piterCode: piterCode,
            kazanCode: kazanCode,
            destinationCity: {
                code: destinationCode,
                englishName: englishName 
            }
        }
        
        resp.send(respJson)
    })
})

app.get('/api/getId', (req, resp) => {
    var city = req.query.city
    let url = "http://engine.hotellook.com/api/v2/lookup.json?query="+city+"&lang=ru&lookFor=both&limit=1"
    request(url, (error, response, body) => {
        var jsonBody = JSON.parse(body)
        var id = jsonBody.results.locations[0].id
        resp.json({id: id})
    })
})

app.listen(app.get('port'), function() {
    console.log('Express server started on port ' + app.get('port'))
})