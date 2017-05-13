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
    request(url, (error, response, body) => {
        var data = JSON.parse(body)
        
        var cities = _.map(data, (city) => {
            var object = {
                code: city.code,
            }
            var ru = city.name_translations.ru
            var en = city.name_translations.en
            if (ru !== undefined) {
                object.ru = ru
            }
            if (en !== undefined) {
                object.en = en
            }
            return object
        })
        resp.send(cities)
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