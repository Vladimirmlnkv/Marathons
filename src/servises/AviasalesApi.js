class AviasalesApi {

    fetchCities(destinationCity) {
        return fetch("/api/cities?destinationCity=" + destinationCity)
        .then((data) => { return data.json() })
        .then((data) => { return data})
        .catch((error) => {console.log(error)})
    }

    getCityId(city) {
        var url = "/api/getId?city=" + city
        return fetch(url)
        .then((data) => {return data.json()})
        .then((data) => {console.log(data); return data.id})
        .catch((error) => {console.log(error)})
    }

}

module.exports = new AviasalesApi()