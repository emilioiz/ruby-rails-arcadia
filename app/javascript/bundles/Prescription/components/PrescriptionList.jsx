import React, { Component } from 'react';
import axios from 'axios';

export const headers = ReactOnRails.authenticityHeaders()

export default class PrescriptionList extends React.Component {
    state = { DrugsList: [] }

    fetchDrugsList = () => {
        DrugsList = this.state;
            axios.get(`prescriptions.json`).then((response => {
            const data = response.data
            this.setState({ DrugsList: data })
            }))
    }

    render() {
        let myObj = this.state.DrugsList
        return (
            <p>look into fetch function</p>
            // myObj.forEach(drug => {
            //     <div>
            //         <div>{drug.brand_name}</div>
            //         <div>{drug.generic_name}</div>
            //         <div>{drug.dosage_form}</div>
            //         <div>{drug.product_type}</div>
            //         <div>{drug.product_ndc}</div>
            //         <div>{drug.user_dosage}</div>
            //         <div>{drug.user_notes}</div>
            //     </div>
            // })
        )
    }

}