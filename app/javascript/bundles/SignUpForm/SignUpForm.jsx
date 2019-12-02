// #=============================================
// #DO NOT DELETE THIS FILE
// #Save as reference for future functionality
// #=============================================

import React, { Component } from 'react';
import axios from 'axios';
import { schema } from './SignUpForm.schema';

const headers = ReactOnRails.authenticityHeaders()

class SignUpForm extends Component {
  state = { activeForm: 'basicInfo' }

  handleInputChange = field => e => this.setState({ [field]: e.target.value })

  handleFormChange = activeForm => () => this.setState({ activeForm })

  handleFormSubmit = async e => {
    e.preventDefault();
    const { activeForm, ...responses } = this.state;
    await axios.post('sign_up_survey#create', { responses }, { headers })
    Turbolinks.visit('/users/sign_up')
  }

  render() {
    const { activeForm } = this.state;
    const formSchema = schema[activeForm] || {};
   return (
     <form onSubmit={this.handleFormSubmit}>
       {formSchema.fields.map(({ label, id }) => (
         <div className="form-group">
          <label>{label}</label>
          <input type='text' onChange={this.handleInputChange(id)} value={this.state[id] || ''} />
         </div>
       ))}
      {formSchema.prevForm && <button onClick={this.handleFormChange(formSchema.prevForm)}>Previous</button>}
      {formSchema.nextForm ? <button onClick={this.handleFormChange(formSchema.nextForm)}>Next</button> : <input type="submit" value="submit this form" />}
     </form>
   )
  }
}

export default SignUpForm