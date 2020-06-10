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
            mailchimpUrl: '',
            mailchimpList: '',
            airtableKey: '',
            airtableBase: ''
        }

        this.setMailchimpAPIKey = this.setMailchimpAPIKey.bind(this);
        this.setMailchimpList = this.setMailchimpList.bind(this);
        this.setMailchimpUrl = this.setMailchimpUrl.bind(this);
        this.setAirTableAPIKey = this.setAirTableAPIKey.bind(this);
        this.setAirTableBase = this.setAirTableBase.bind(this);
        this.validateAPIKeys = this.validateAPIKeys.bind(this);
    }

    setMailchimpAPIKey(e) {
        // set for mailchimp
        e.preventDefault();
        // console.log('set mailchimp', e);
        this.setState({mailchimpKey: e.target.value}, function () {
          console.log("mailchimpAPI", this.state.mailchimpKey);
      });
    }

    setMailchimpList(e) {
      // set for mailchimp
      e.preventDefault();
      // console.log('set mailchimp', e);
      this.setState({mailchimpList: e.target.value}, function () {
        console.log("mailchimpList", this.state.mailchimpList);
    });
  }

    setMailchimpUrl(){
      const mailchimpApiArray = (this.state.mailchimpKey).split('-');
      const mailchimpUrlBuilder = "https://" + mailchimpApiArray[1] + ".api.mailchimp.com/3.0/";
      console.log(mailchimpUrlBuilder);
      this.setState({mailchimpUrl: mailchimpUrlBuilder}, function () {
        console.log("mailchimpURL", this.state.mailchimpUrl);
      });
    }

    setAirTableAPIKey(e) {
      // set for airtable
      e.preventDefault();
      // console.log('set airtable', e);
      this.setState({airtableKey: e.target.value}, function () {
        console.log("airtableAPI", this.state.airtableKey);
      });

  }

  setAirTableBase(e) {
    // set for airtable
    e.preventDefault();
    // console.log('set airtable', e);
    this.setState({airtableBase: e.target.value}, function () {
      console.log("airtableBase", this.state.airtableBase);
    });

}

// still need to get validation working here
    validateAPIKeys(e) {
      e.preventDefault();
      this.setState({keysValid: true});
      this.setMailchimpUrl();
      // console.log('validate', e)
      this.props.callbackForValidation(this.state.keysValid);
      this.props.callbackForAirtableAPI(this.state.airtableKey);
      this.props.callbackForAirtableBase(this.state.airtableBase);
      this.props.callbackForMailchimpAPI(this.state.mailchimpKey);
      this.props.callbackForMailchimpUrl(this.state.mailchimpUrl);
      this.props.callbackForMailchimpList(this.state.mailchimpList);
      console.log('mailchimpURL', this.state.mailchimpUrl);
      console.log('mailchimpAPI', this.state.mailchimpKey);
      console.log('airtableAPI', this.state.airtableKey);
      console.log('airtable base', this.state.airtableBase);
    }
    

    render () {
        return (
            <div>
          <img className="logo" img src="https://cdn-az.allevents.in/banners/34f81faeb09b04cf6c85354a6d3baa44-rimg-w2087-h1398-gmir.jpg"
          ></img>
          <div className="headers">
  
  
            <header id="AdminPortaltext">ADMIN PORTAL</header>
          </div>

        <form className="api-form" id="api-form" onSubmit={this.validateAPIKeys}>
         
          <label>mailchimp API KEY</label><br />
          <input type="text" id="mailchimp-api-key" value={this.state.mailchimpKey} onChange={this.setMailchimpAPIKey}></input><br />
          <label>mailchimp LIST ID</label><br />
          <input type="text" id="mailchimp-list-id" value={this.state.mailchimpList} onChange={this.setMailchimpList}></input><br />
          <label>airtable API KEY</label><br />
          <input type="text" id="airtable-api-key" value={this.state.airtableKey} onChange={this.setAirTableAPIKey}></input><br />
          <label>airtable BASE ID</label><br />
          <input type="text" id="airtable-base-id" value={this.state.airtableBase} onChange={this.setAirTableBase}></input><br />
          
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