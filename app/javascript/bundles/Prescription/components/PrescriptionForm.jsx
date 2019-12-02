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
      <div>
        <span>search for 0002-3238</span>
        <div>
          <input
          type='search' 
          id='ndcCode'
          onChange = {this.handleInputChange('ndcQuery')}
          placeholder='Search by NDC Code'
          />
          <span>
            <button className="button is-info" onClick={this.fetchDrugs}>
              Search
            </button>
          </span>
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="brand">Brand Name</label>
              <input id="brand" type="text" value={myObj.brandName} readOnly/>
            </div>
            <div>
              <label htmlFor="brand">Generic Name</label>
              <input id="generic-name" type="text" value={myObj.genericName} readOnly/>
            </div>
            <div>
              <label htmlFor="brand">Dosage Form</label>
              <input id="dosage-form" type="text" value={myObj.dosageForm} readOnly/>
            </div>
            <div>
              <label htmlFor="brand">Product Type</label>
              <input id="product-type" type="text" value={myObj.productType} readOnly/>
            </div>
            <div>
              <label htmlFor="brand">Product Id</label>
              <input id="product-id" type="text" value={myObj.productID} readOnly/>
            </div>
            <div>
              <label htmlFor="brand">Product NDC</label>
              <input id="product-ndc" type="text" value={myObj.productNDC} readOnly/>
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <input id="notes" onChange={this.handleInputChange('userNotes')} type="text" />
            </div>
              <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      )
    }
  }
  