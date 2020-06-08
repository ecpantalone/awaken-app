import React from 'react';
import './App.css';
import './flatpickr.css';
import AirTable from './airtable';
import Formmenu from './formmenu';
import MailChimp from './mailchimp';
import UpdateMailchimp from './updatemailchimp';

class APIRequestForm extends React.Component {
    constructor(props) {
        super (props)

        this.state = {
            keysValid: false,
            mailchimpKey: '',
            airtableKey: ''
        }

        this.setAPIKeys = this.setAPIKeys.bind(this);
    }

    setAPIKeys(e) {
        // set for mailchimp
        console.log(e);

        // set for airtable
    }


    render () {
        return (
            <div>
          <img className="logo" img src="https://cdn-az.allevents.in/banners/34f81faeb09b04cf6c85354a6d3baa44-rimg-w2087-h1398-gmir.jpg"
          ></img>
          <div className="headers">
  
  
            <header id="AdminPortaltext">ADMIN PORTAL</header>
          </div>
          <form className="form-box" id="api-form">
          <label htmlFor="list">mailchimp API KEY</label><br />
          <input type="text" id="mailchimp-api-key"></input><br />
          <label htmlFor="list">airtable API KEY</label><br />
          <input type="text" id="airtable-api-key"></input><br />
          <button form="api-form" onClick={this.setAPIKeys}>Submit</button>
        </form>

          <div className="footer">
            <footer>Connect Mindfully. Live Fully.</footer>
          </div>
            </div>
            
        )
    }
}

export default APIRequestForm;