import React, { Component } from "react";
import axios from "axios";

export const headers = ReactOnRails.authenticityHeaders();

const eventTypeOptions = [
  { label: "Select Type", value: "" },
  { label: "Prescription", value: "prescriptions" },
  { label: "Contact", value: "contacts" }
];

export default class EventForm extends React.Component {
  state = {
    eventTypeData: [],
    eventValues: { type: "", name: "", date: "", time: "", notes: "" }
  };

  fetchData = async e => {
    const { eventValues } = this.state;
    const type = e.target.value;
    const normalizedType =
      type[0].toUpperCase() + type.substr(1, type.length - 2);
    const { data } = await axios.get(`/${type}.json`);
    this.setState({
      eventTypeData: data,
      eventValues: { ...eventValues, name: data[0].id, type: normalizedType }
    });
  };

  handleInputChange = field => e => {
    const value = e.target.value.trim();
    this.setState(prevState => ({
      eventValues: { ...prevState.eventValues, [field]: value }
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { eventValues } = this.state;
    await axios.post("/events", eventValues, { headers });
    Turbolinks.visit("/events");
  };

  
  render() {
    const { eventTypeData } = this.state;
    return(
      <form id='add-event' onSubmit={this.handleSubmit}>
        <div id='add-event-status-bar'></div>
        <div id='add-event-header'>New Activity</div>
        <div id='add-event-form-fields'>
          <div className='add-event-form-field-label'>Type</div>
              <select onChange={this.fetchData} >
              {eventTypeOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
              </select>
          <div className='add-event-form-field-label'>Name</div>
              <select onChange={this.handleInputChange('name')} >
              {eventTypeData.map(data => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
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