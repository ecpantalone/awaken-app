import React from 'react';
import './App.css';
import './flatpickr.css';
import AirTable from './airtable';
import Formmenu from './formmenu';
import MailChimp from './mailchimp';
import UpdateMailchimp from './updatemailchimp';
import Dashboard from './dashboard';
import APIRequestForm from './apirequestform';

class App extends React.Component {


  render() {


  return (
    <APIRequestForm />
    // <Dashboard />
    
  );
  }
}


export default App;

