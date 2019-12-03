import React, { Component } from 'react'
import axios from 'axios'
import * as dateFns from 'date-fns'

export const headers = ReactOnRails.authenticityHeaders()

export default class Home extends React.Component {
  state = {
    weeklyView: false,
    weekDays:   { Su: '1', M: '2', T: '3', W: '4', Th: '5', F: '6', S: '7'},
    numMeds:       0,
    numAppts:      0 
  }
  
  componentDidMount() {
    this.fetchData()
  }
  
  handleWeekDays = () => {
    const values = this.state.weekDays
    const valuesList = Object.keys(values).map(key =>
      <div id='home-body-date-container'>
        <div className='ft-nunito-10 ft-cr-blurple-berry' >
          {key}
        </div>
        <a href="" id='home-body-date-container-value' className='ft-nunito-18 ft-cr-barney' >
          {values[key]}
        </a>
      </div>
    )
    return valuesList
  }

  fetchData = async () => {
    const currentDate = new Date()
    const weekStart = dateFns.startOfWeek(currentDate)
    const weekEnd = dateFns.endOfWeek(currentDate)
    const startDate = dateFns.format(dateFns.startOfWeek(weekStart), 'yyyy-MM-dd')
    const endDate = dateFns.format(dateFns.endOfWeek(weekEnd), 'yyyy-MM-dd')
    const response1 = await axios.get(`/events.json?start_date=${startDate}&end_date=${endDate}&event_type=Prescription`)
    const response2 = await axios.get(`/events.json?start_date=${startDate}&end_date=${endDate}&event_type=Contact`)
    const numMeds = response1.data.length
    this.setState({ numMeds: numMeds })
    const numAppts = response2.data.length
    this.setState({ numAppts: numAppts })
  }

  render() {
    return(
      <div id='home-body' className='bkgrd-cr-taupe'>
        <nav id='home-body-nav' className='bkgrd-cr-vanilla'>
          <div id='home-body-nav-left' className='ft-ramabhadra-24 ft-cr-mixed-berries'>
            <a href=''>
              Treatment
            </a>
            <svg height='10px' width='64px'>
                <line x1="64" y1="0" className='home-body-nav-active-line'/>
            </svg>
          </div>
          <div id='home-body-nav-right' className='ft-ramabhadra-24 ft-cr-periwinkle'>
            <a href=''>
              Educate
            </a>
            {/* Need to make l/r display only when active
            <svg height='10px' width='64px'>
                <line x1="64" y1="0" className='home-body-nav-active-line'/>
            </svg> */}
          </div>
        </nav>
        <div id='home-body-month'>
          <div id='home-body-month-left' className='ft-nunito-20 ft-cr-pleasent-purple'>
            <span>December</span>
          </div>
          <a href='' id='home-body-month-right'>
            <i className="far fa-calendar-alt ft-cr-barney" id="home-body-month-cal-icon"></i>
          </a>
        </div>
        <div id='home-body-date'>
          {this.handleWeekDays()}
        </div>
        <div id='home-body-dashboard'>
          <div id='home-body-dashboard-div-1'>
          </div>
          <div id='home-body-dashboard-div-2'>
            <div id='home-body-dashboard-agenda'>
              <div id='home-body-dashboard-agenda-div-1'>
                <span className='ft-arimo-36 ft-cr-pure-white'>Your Week</span>
              </div>
              <div id='home-body-dashboard-agenda-div-2'>
                <div>
                  <span className='ft-arimo-14 ft-cr-pure-white'>{this.state.numMeds} medications</span>
                </div>
                <div>
                  <span className='ft-arimo-14 ft-cr-pure-white'>{this.state.numAppts} appointments</span>
                </div>
                <div>
                  <span className='ft-arimo-14 ft-cr-pure-white'>0 reminders</span>
                </div>
              </div>
              <div id='home-body-dashboard-agenda-div-3'>
                <a href='/agendas' className='ft-nunito-12 ft-cr-mixed-berries'>view agenda</a>
              </div>
            </div>
          </div>
          <div id='home-body-dashboard-div-3'>
          </div>
        </div>
      </div>
      )
    }
  }