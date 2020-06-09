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

        this.setMailchimpAPIKeys = this.setMailchimpAPIKeys.bind(this);
        this.setAirTableAPIKeys = this.setAirTableAPIKeys.bind(this);
        this.validateAPIKeys = this.validateAPIKeys.bind(this);
    }

    setMailchimpAPIKeys(e) {
        // set for mailchimp
        e.preventDefault();
        // console.log('set mailchimp', e);
        this.setState({mailchimpKey: e.target.value}, function () {
          console.log("mailchimpAPI", this.state.mailchimpKey);
      });
    }

    setAirTableAPIKeys(e) {
      // set for airtable
      e.preventDefault();
      // console.log('set airtable', e);
      this.setState({airtableKey: e.target.value}, function () {
        console.log("airtableAPI", this.state.airtableKey);
      });

  }

    validateAPIKeys(e) {
      e.preventDefault();
      this.setState({keysValid: true});
      // console.log('validate', e)
      this.props.callbackForValidation(this.state.keysValid);
      this.props.callbackForAirtableAPI(this.state.airtableKey);
      this.props.callbackForMailchimpAPI(this.state.mailchimpKey);
      console.log('mailchimpAPI', this.state.mailchimpKey)
      console.log('airtableAPI', this.state.airtableKey)
    }
    

    render () {
        return (
            <div>
          <img className="logo" img src="https://cdn-az.allevents.in/banners/34f81faeb09b04cf6c85354a6d3baa44-rimg-w2087-h1398-gmir.jpg"
          ></img>
          <div className="headers">
  
  
            <header id="AdminPortaltext">ADMIN PORTAL</header>
          </div>

        <form className="form-box" id="api-form" onSubmit={this.validateAPIKeys}>
         
          <label>mailchimp API KEY</label><br />
          <input type="text" id="mailchimp-api-key" value={this.state.mailchimpKey} onChange={this.setMailchimpAPIKeys}></input><br />
          <label>airtable API KEY</label><br />
          <input type="text" id="airtable-api-key" value={this.state.airtableKey} onChange={this.setAirTableAPIKeys}></input><br />
          
          <input type="Submit" value="Submit" onClick={this.validateAPIKeys} id="api-form"></input>
        </form>

          <div className="footer">
            <footer>Connect Mindfully. Live Fully.</footer>
          </div>
            </div>
            
        )
    }
}

export default APIRequestForm;