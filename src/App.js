import React, { Component } from 'react';
import './App.css';
import Api from './servises/AviasalesApi.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      place: "",
      date: "",
      price: "",
      flightMarker: "?marker=87783",
      hotelMarker: "&marker=87783",
      marahtonSite: "",
      fromCity: "",
      toCity: "",
      arrivalDate: "",
      departureDate: "",
      visa: "",
      text: ""
    }

    this.changeField = this.changeField.bind(this)
    this.generateText = this.generateText.bind(this)
  }
  
  changeField(event) {
    var key = event.target.name.toString()
    this.setState({
      [key]: event.target.value,
    })
  }

  _inputsFilled() {

  }

  generateText(event) {
    event.preventDefault()
    var baseUrl = "https://search.aviasales.ru/"
    Api.fetchCities(this.state.toCity).then((data) => {
      if (data.error !== undefined) {
        alert("Некорректно введен город проведения марафона!")
        return
      }
      var toCity = data.destinationCity.code      
      Api.getCityId(data.destinationCity.englishName).then((id) => {

        var moscowCode = data.moscowCode
        var piterCode = data.piterCode
        var kazanCode = data.kazanCode

        var arrivalComponents = this.state.arrivalDate.split('-')
        var ticketsArrivalDate = arrivalComponents[2] + arrivalComponents[1]
        var departureComponents = this.state.departureDate.split('-')
        var ticketsDepartureDate = departureComponents[2] + departureComponents[1]

        var fromMoscowUrl = baseUrl + moscowCode + ticketsArrivalDate + toCity + ticketsDepartureDate + '1' + this.state.flightMarker
        var fromPiterUrl = baseUrl + piterCode + ticketsArrivalDate + toCity + ticketsDepartureDate + '1' + this.state.flightMarker
        var fromKazanUrl = baseUrl + kazanCode + ticketsArrivalDate + toCity + ticketsDepartureDate + '1' + this.state.flightMarker

        var hotelUrl = "https://search.hotellook.com/?locationId=" + id + "&checkIn=" + this.state.arrivalDate + "&checkOut=" + this.state.departureDate + "&adults=1&language=ru-RU&currency=RUB&marker=87783"

        var text = this.state.name + "\n" + this.state.place + "\n\nДата мероприятия: " + this.state.date + "\nCтартовый взнос: " 
        + this.state.price + "\n\n" + this.state.site + "\n" + this.state.visa + "\n\nВыезд из:\nМосквы: " + fromMoscowUrl 
        + "\nПитера: " + fromPiterUrl + "\nКазани: " + fromKazanUrl + "\n\nПроживание: " + hotelUrl
        this.setState({
          text: text
        })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.generateText}>
          <label onChange={this.changeField}>
            <input className="TextInput" type="textarea" name="name" placeholder="Название" value={this.state.name} required/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="place" placeholder="Место проведения" value={this.state.place} required/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="date" placeholder="Дата мероприятия" value={this.state.date} required/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="price" placeholder="Стартовый взнос" value={this.state.price} required/>
          </label>
          <br></br>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="site" placeholder="Сайт" value={this.state.site} required/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="visa" placeholder="Виза" value={this.state.visa} required/>
          </label>
          <br></br>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="toCity" placeholder="Куда летим" value={this.state.toCity} required/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="arrivalDate" placeholder="Дата туда" value={this.state.arrivalDate} required/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="departureDate" placeholder="Дата обратно" value={this.state.departureDate} required/>
          </label>
          <div className="SubmitButton">
            <button className="Button">Сгенерировать текст</button>
          </div>  
        </form>
        <div className="Text">
          <p style={{whiteSpace: 'pre-wrap'}}>{this.state.text}</p>
        </div>
      </div>
    );
  }
}

export default App;
