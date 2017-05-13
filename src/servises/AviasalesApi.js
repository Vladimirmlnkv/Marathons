class AviasalesApi {

    fetchCities() {
        return fetch("/api/cities")
        .then((data) => {return data.json()})
        .then((data) => { return data})
        .catch((error) => { return error })
    }

    getCityId(city) {
        var url = "/api/getId?city=" + city
        return fetch(url)
        .then((data) => { return data.json()})
        .then((data) => { return data.id})
        .catch((error) => {console.log(error)})
    }
    
}

module.exports = new AviasalesApi()