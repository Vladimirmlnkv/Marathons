import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import _ from 'lodash'

class AutocompleteField extends Component {

	constructor(props) {
		super(props)
		this.state = {
			suggestions: [],
		}
	}

	onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

	onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }
	
	getSuggestionValue = suggestion => suggestion.ru
	
	renderSuggestion = suggestion => (
		<span>{suggestion.ru}</span>
	)

	onChange = (event, { newValue }) => {
		this.props.onChange(newValue)
  }

	getSuggestions = value => {
		const inputValue = value.trim().toLowerCase()
		const inputLength = inputValue.length

		return inputLength === 0 ? [] : _.filter(this.props.cities, (city) => {
			if (city.ru === undefined) {return false} 
			return city.ru.toLowerCase().slice(0, inputLength) === inputValue
		})
	}

	render() {
		const { suggestions } = this.state
		const inputProps = {
				placeholder: this.props.placeholder,
				value: this.props.value,
				onChange: this.onChange,
		};

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				inputProps={inputProps}
			/>
		)
	}
}

export default AutocompleteField;
