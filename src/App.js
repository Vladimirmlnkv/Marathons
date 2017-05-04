import React, { Component } from 'react';
import './App.css';
import Api from './servises/AviasalesApi.js'
import _ from "lodash"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      placeUrl: "",
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
      text: "",
      textGenerated: false,
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

  generateText(event) {
    event.preventDefault()
    // this.setState({textGenerated: true})
    var baseUrl = "https://search.aviasales.ru/"
    Api.fetchCities().then((data) => {
      var toCity = _.find(data, (el) => {return el.name_translations.ru === this.state.toCity})
      if (toCity === undefined) {
        alert("Некорректно введен город проведения марафона!")
      } else {      
        var moscowCode = _.find(data, (el) => {return el.name_translations.ru === "Москва"}).code
        var piterCode = _.find(data, (el) => {return el.name_translations.ru === "Санкт-Петербург"}).code
        var kazanCode = _.find(data, (el) => {return el.name_translations.ru === "Казань"}).code
        var fromMoscowUrl = baseUrl + moscowCode + this.state.arrivalDate + toCity.code + this.state.departureDate + '1' + this.state.flightMarker
        var fromPiterUrl = baseUrl + piterCode + this.state.arrivalDate + toCity.code + this.state.departureDate + '1' + this.state.flightMarker
        var fromKazanUrl = baseUrl + kazanCode + this.state.arrivalDate + toCity.code + this.state.departureDate + '1' + this.state.flightMarker

        var text = this.state.name + "\n" + this.state.place + "\n\nДата мероприятия: " + this.state.date + "\nCтартовый взнос: " 
        + this.state.price + "\n\n" + this.state.site + "\n" + this.state.visa + "\n\nВыезд из:\nМосквы: " + fromMoscowUrl 
        + "\nПитера: " + fromPiterUrl + "\nКазани: " + fromKazanUrl + "\n\nПроживание: " + this.state.placeUrl + this.state.hotelMarker
        this.setState({
          text: text
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <form>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="name" placeholder="Название" value={this.state.name}/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="place" placeholder="Место проведения" value={this.state.place}/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="date" placeholder="Дата мероприятия" value={this.state.date}/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="price" placeholder="Стартовый взнос" value={this.state.price}/>
          </label>
          <br></br>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="site" placeholder="Сайт" value={this.state.site}/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="visa" placeholder="Виза" value={this.state.visa}/>
          </label>
          <br></br>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="toCity" placeholder="Куда летим" value={this.state.toCity}/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="arrivalDate" placeholder="Дата туда" value={this.state.arrivalDate}/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="departureDate" placeholder="Дата обратно" value={this.state.departureDate}/>
          </label>
          <label onChange={this.changeField}>
            <input className="TextInput" type="text" name="placeUrl" placeholder="Отель" value={this.state.placeUrl}/>
          </label>
          <button onClick={this.generateText}>Сгенерировать текст</button>
        </form>
        <div className="Text">
          <p style={{whiteSpace: 'pre-wrap'}}>{this.state.text}</p>
        </div>
      </div>
    );
  }
}

export default App;
