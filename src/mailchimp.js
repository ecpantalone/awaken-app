import React from 'react';
import './App.css';
//import { useEffect } from 'react';

// these need to go into an .env file and be gitignored
const mailchimpAPIKey = "de3be56ee674cb1b6c68d16d40784d34-us18";
const mailchimpURI = "http://localhost:8080/https://us18.api.mailchimp.com/3.0/";

class MailChimp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
      lists: []
    }

    // bind things here
    this.getTemplates = this.getTemplates.bind(this);
    this.getEmailLists = this.getEmailLists.bind(this);
    this.buildTemplate = this.buildTemplate.bind(this);
    this.buildList = this.buildList.bind(this);
    //this.renderStuff = this.renderStuff.bind(this);

  }

  // useEffect(() => {
  //   let canceled = false;

  //   setLoading(true);
    
  // })

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
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        console.log('got to line 40')
        this.setState({templates: jsonData.templates})})
      .catch(error => console.log('error', error));
  }

  getEmailLists()
  {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "_mcid=1.1ebcc928d439d2d3d9b1ee09a070b504.fbf36732a11449a3cbe72c71f552661db989f91e30f901f9e5eb6eb113c3df30; _AVESTA_ENVIRONMENT=prod; ak_bmsc=70770938853E094C4C89D207F54998B8ACE80944FE5200004C97BC5E6973545B~pledBkBuDC75UQmGXG+Rvhktxr4MEwhQm5wEHWNHuPkVZ7mJUCrfl0tQeug2qPlOqEU8kJ89e1zd/mrUSXGTshWgZP9r8UYMvgzVNeUwxNUg0Re0Y/9Q6fOPjbm0PdbqUGWDy7APvxgXy16gf8GiQE3OnraLSrNSEHggOnelIJJpR8hzsaHl9A2hp9pzOhjo5Gh6/FqRTtIZEninbcbZbhFQOWbkQOH1eyjUz15C5EXuo=; bm_sv=7B1CEF76FA1F5E074266407ED0792CC4~ZCIJiXMoHGWdaOgTpvw6nB0hVzKmRFrZC8xDv4RPKSVN/c/dSAN27kp60ihLtV5fCdQ7jt2Y8LotFx4gNzAJE0ghnilEFpRycDZ82yoJ9oG74jRV6UUrInc5qHGibHh9CDnxm0AX4Kt8CJ9mtW62oLMgINaJW+3IaUVWBAbNO9c=");
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(mailchimpURI + "lists?apikey=" + mailchimpAPIKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({templates: jsonData.lists})})
      .catch(error => console.log('error', error));
  }

  componentDidMount()
  {
    this.getTemplates();
    this.getEmailLists();
  }
  
  buildTemplate(template)
  {
    return (<option value={template.id} key={template.id}>{template.name}</option>)
  }

  buildList(list)
  {
    return (<option value={list.id} key={list.id}>{list.name}</option>)
  }

  // renderStuff()
  // {
  //   let display = [];
  //   if (this.props.mode === "templateList")
  //   {
  //     display = this.state.templates.map(this.buildTemplate);
  //   }
  //   else if (this.props.mode === "emailList")
  //   {
  //     display = this.state.lists.map(this.buildList);
  //   }
  //   return display;
  // }

  render (){

    // let display = renderStuff();
    let displayTemplates = [];
    displayTemplates = this.state.templates.map(this.buildTemplate);
    let displayEmailLists = [];
    displayEmailLists = this.state.lists.map(this.buildList);

    return(
      <React.Fragment>
        {displayTemplates}
        {displayEmailLists}
        {/* {display} */}
        {/* {if (this.props.mode == "templateList"){
          {displayTemplates}
          }
        else if (this.props.mode == "emailList"){
          {displayEmailLists}
          } */}
      </React.Fragment>
      
    );
  }
}

export default MailChimp;