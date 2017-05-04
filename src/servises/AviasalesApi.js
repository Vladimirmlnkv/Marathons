class AviasalesApi {

    fetchCities() {
        return fetch("http://api.travelpayouts.com/data/cities.json", {
            headers: {
                "X-Access-Token": "37813cee19f8d2cc2635c26382fddb24",
            },
        })
        .then((data) => { return data.json() })
        .then((data) => {return data})
        .catch((error) => {console.log(error)})
    }

}

module.exports = new AviasalesApi()