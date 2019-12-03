import React, { Component } from 'react';
import axios from 'axios';

export const headers = ReactOnRails.authenticityHeaders()

export default class PrescriptionForm extends React.Component {
  state = { ndcQuery: '', 
            userNotes: '', 
            drug: { brandName: '', dosageForm: '',genericName: '',productID: '',productNDC: '',productType: '' } 
          }

  handleInputChange = field => e => {
    const value = e.target.value.trim();
    this.setState({ [field]: value })
  }

  fetchDrugs = () => {
    const { ndcQuery } = this.state;
    axios.get(`https://api.fda.gov/drug/ndc.json?search=product_ndc:"${ndcQuery}"`)
    .then(({ data }) => {
      const result = data.results[0] || {};
      const { brand_name: brandName,
              generic_name: genericName, 
              dosage_form: dosageForm, 
              product_type: productType,
              product_id: productID,
              product_ndc: productNDC
            } = result;
      this.setState({ drug: { brandName, dosageForm, genericName, productID, productNDC, productType }})
    })
  }

  handleSubmit = async e => {
    const { drug, userNotes } = this.state;
    const { data } =  await axios.post("prescriptions#create", { ...drug, userNotes }, { headers })
  };

  render() {
    let myObj = this.state.drug
    return(
      <form id='add-prescription' onSubmit={this.handleSubmit}>
        <div id='add-prescription-status-bar'></div>
        <div id='add-prescription-header'>New Medication</div>
        <div id='add-prescription-form-fields'>
          <div className='add-prescription-form-field-label'>NDC Code</div>
          <div id='add-prescription-search'>
            <input type='search' id='ndcCode' onChange = {this.handleInputChange('ndcQuery')} placeholder='Ex. 55566-7501' autocomplete='off'/>
            <div id='add-prescription-search-icon'>  
              <i className='far fa-search button is-info' onClick={this.fetchDrugs}></i>
            </div>      
          </div>
          <div className='add-prescription-form-field-label' >Brand Name</div>  
          <input id="brand" type="string" value={myObj.brandName} readOnly autocomplete='off'/>
          <div className='add-prescription-form-field-label' >Generic Name</div> 
          <input id="generic-name" type="string" value={myObj.genericName} readOnly autocomplete='off'/>
          <div className='add-prescription-form-field-label' >Dosage Form</div> 
          <input id="dosage-form" type="string" value={myObj.dosageForm} readOnly autocomplete='off'/>
          <div className='add-prescription-form-field-label' >Product Type</div> 
          <input id="product-type" type="string" value={myObj.productType} readOnly autocomplete='off'/>
          <div className='add-prescription-form-field-label' >Product ID</div> 
          <input id="product-id" type="string" value={myObj.productID} readOnly autocomplete='off'/>
          <div className='add-prescription-form-field-label' >Product NDC</div> 
          <input id="product-ndc" type="string" value={myObj.productNDC} readOnly autocomplete='off'/>
          <div className='add-prescription-form-field-label' >My Notes</div>
          <input id="prescription-notes" onChange={this.handleInputChange('userNotes')} type="text" autocomplete='off'/>
        </div>
        <button id='add-prescription-form-submit' type="submit">
          Add
        </button>
      </form>
      )
    }
  }
  