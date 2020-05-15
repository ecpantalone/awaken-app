import React from 'react';
import './App.css';
import request from 'request';

// these need to go into an .env file and be gitignored
const mailchimpAPIKey = "de3be56ee674cb1b6c68d16d40784d34-us18";
const mailchimpURI = "http://localhost:8080/https://us18.api.mailchimp.com/3.0/";

class MailChimp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: []
    }

    // bind things here
    this.getTemplates = this.getTemplates.bind(this);
  }

  componentDidMount()
  {
    this.getTemplates();
    console.log(this.state.templates);
  }
  
  getTemplates()
  {
    let myHeaders = new Headers();
  myHeaders.append("Cookie", "_mcid=1.1ebcc928d439d2d3d9b1ee09a070b504.fbf36732a11449a3cbe72c71f552661db989f91e30f901f9e5eb6eb113c3df30; _AVESTA_ENVIRONMENT=prod; ak_bmsc=70770938853E094C4C89D207F54998B8ACE80944FE5200004C97BC5E6973545B~pledBkBuDC75UQmGXG+Rvhktxr4MEwhQm5wEHWNHuPkVZ7mJUCrfl0tQeug2qPlOqEU8kJ89e1zd/mrUSXGTshWgZP9r8UYMvgzVNeUwxNUg0Re0Y/9Q6fOPjbm0PdbqUGWDy7APvxgXy16gf8GiQE3OnraLSrNSEHggOnelIJJpR8hzsaHl9A2hp9pzOhjo5Gh6/FqRTtIZEninbcbZbhFQOWbkQOH1eyjUz15C5EXuo=; bm_sv=7B1CEF76FA1F5E074266407ED0792CC4~ZCIJiXMoHGWdaOgTpvw6nB0hVzKmRFrZC8xDv4RPKSVN/c/dSAN27kp60ihLtV5fCdQ7jt2Y8LotFx4gNzAJE0ghnilEFpRycDZ82yoJ9oG74jRV6UUrInc5qHGibHh9CDnxm0AX4Kt8CJ9mtW62oLMgINaJW+3IaUVWBAbNO9c=");
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  fetch(mailchimpURI + "templates?apikey=" + mailchimpAPIKey, requestOptions)
    .then(response => {
      console.log('response')
      return response.json()
    })
    .then(result => console.log("****************",result))
    .catch(error => console.log("****************",'error', error));
  }

  showTemplates()
  {
    // I reckon we want to build 
    return (console.log("just returning some stuff"))
  }

  render (){
    const displayTemplates = this.state.templates.map(this.showTemplates);
  
    console.log('displayTemplates', displayTemplates)
    return(
    <option value="1">Hi!</option>
    );
  }
}

export default MailChimp;