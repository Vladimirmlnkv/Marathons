import React, { Component } from 'react';
import './App.css';
import Api from './servises/AviasalesApi.js'
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import AutocompleteField from './components/AutocompleteField.js'
import _ from 'lodash'

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
      visa: "",
      text: "",
      city: "",
      cities: []
    }

    this.changeField = this.changeField.bind(this)
    this.generateText = this.generateText.bind(this)
  }

  componentDidMount() {
    Api.fetchCities().then((data) => {
      console.log(data)
      this.setState({
        cities: data,
      })
    })
  }
  
  changeField(event) {
    var key = event.target.name.toString()
    this.setState({
      [key]: event.target.value,
    })
  }

  generateText(event) {
    event.preventDefault()
    var baseUrl = "https://search.aviasales.ru/"

    if (this.state.cities.length === 0) {
      alert("Попробуйте позже")
    } else {
      
      var toCity = _.find(this.state.cities, (el) => {
        if (el.ru === undefined) { return false }
        return el.ru.toLowerCase() === this.state.city.toLowerCase()
      })
      if (toCity === undefined) {
        alert("Неверный город!")
        return
      }    
      Api.getCityId(toCity.en).then((id) => {

        var ticketsDateFormat = "DDMM"
        var hotelsDateFormat = "YYYY-MM-DD"
        var ticketsStartDate = this.state.startDate.format(ticketsDateFormat)
        var ticketsEndDate = this.state.endDate.format(ticketsDateFormat)

        var hotelStartDate = this.state.startDate.format(hotelsDateFormat)
        var hotelEndDate = this.state.endDate.format(hotelsDateFormat)

        var moscowCode = _.find(this.state.cities, (el) => { return el.ru === 'Москва'}).code
        var piterCode = _.find(this.state.cities, (el) => { return el.ru === 'Санкт-Петербург'}).code
        var kazanCode = _.find(this.state.cities, (el) => { return el.ru === 'Казань'}).code

        var fromMoscowUrl = baseUrl + moscowCode + ticketsStartDate + toCity.code + ticketsEndDate + '1' + this.state.flightMarker
        var fromPiterUrl = baseUrl + piterCode + ticketsStartDate + toCity.code + ticketsEndDate + '1' + this.state.flightMarker
        var fromKazanUrl = baseUrl + kazanCode + ticketsStartDate + toCity.code + ticketsEndDate + '1' + this.state.flightMarker

        var hotelUrl = "https://search.hotellook.com/?locationId=" + id + "&checkIn=" + hotelStartDate + "&checkOut=" + hotelEndDate + "&adults=1&language=ru-RU&currency=RUB&marker=87783"

        var text = this.state.name + "\n" + this.state.place + "\n\nДата мероприятия: " + this.state.date + "\nCтартовый взнос: " 
        + this.state.price + "\n\n" + this.state.site + "\n" + this.state.visa + "\n\nВыезд из:\nМосквы: " + fromMoscowUrl 
        + "\nПитера: " + fromPiterUrl + "\nКазани: " + fromKazanUrl + "\n\nПроживание: " + hotelUrl
        this.setState({
          text: text
        })
      })
    }
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
          <div className="DatePickerContainter">
            <AutocompleteField
              placeholder="Город"
              cities={this.state.cities}
              value={this.state.city}
              onChange={value => this.setState({city: value})}
            />
            <DateRangePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
              focusedInput={this.state.focusedInput} 
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              required
            />
          </div>
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
