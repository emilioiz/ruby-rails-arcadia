import React, { Component } from 'react'
import axios from 'axios'

export const headers = ReactOnRails.authenticityHeaders()

export default class EventForm extends React.Component {
  state = { 
    eventTypeOptions: {
                        'Select Type':    '',
                        'Prescription':   'prescriptions',
                        'Contact':        'contacts'
                      },
    eventTypeData: [],
    eventValues: { type: '',name: '',date: '',time: '',notes: '' }
  }

  fetchData = (eventTypeValue) => {
    axios.get(`/${eventTypeValue}.json`)
    .then((response => {
      const data = response.data
      this.setState({ eventTypeData: data})
      }
    ))
  }

  optionsArray = (s) => {
    let keys = []
    let values = []
    for (const property in s) {
      keys.push(property)
      values.push(s[property])
    }
     let options = keys.map((key,i) => {
        return(
          <option key={key} value={values[i]}>{key}</option>
        )
      })
      return options
    }

    handleInputChange = field => e => {
      let value = e.target.value.trim()
      if (value === 'contacts') {
          this.fetchData(value)
          value = 'Contact'
        } else if (value === 'prescriptions') {
          this.fetchData(value)
          value = 'Prescription'
        }
      this.setState(prevState => ({
        eventValues: {
          ...prevState.eventValues,
          [field]: value
          }
        }))
    }

    handleSubmit = async e => {
    const { eventValues } = this.state;
    const { data } =  await axios.post("events#create", { ...eventValues }, { headers })
    }
  
  render() {
    return(
      <form id='add-event' onSubmit={this.handleSubmit}>
        <div id='add-event-status-bar'></div>
        <div id='add-event-header'>New Activity</div>
        <div id='add-event-form-fields'>
          <div className='add-event-form-field-label'>Type</div>
              <select onChange={this.handleInputChange('type')} >
                {this.optionsArray(this.state.eventTypeOptions).map(option => option)}
              </select>
          <div className='add-event-form-field-label'>Name</div>
              <select onChange={this.handleInputChange('name')} >
                {this.state.eventTypeData.map(data => <option key={data.id} value={data.id}>{data.name}</option> )}
              </select>
          <div className='add-event-form-field-label'>Date</div>
            <input id="date" onChange={this.handleInputChange('date')} type="date" />
          <div className='add-event-form-field-label'>Time</div>
            <input id="time" onChange={this.handleInputChange('time')} type="time" />
          <div className='add-event-form-field-label'>Notes</div>
            <input id="event-notes" onChange={this.handleInputChange('notes')} type="text" />
          <button id='add-event-form-submit' type="submit" >Add</button>
        </div>
      </form>
      )
    }
  }