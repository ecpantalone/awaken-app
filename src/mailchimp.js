import './App.css';
import React from 'react';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { Component } from "react";


// these need to go into an .env file and be gitignored
const CORS = "http://localhost:8080/";
// const flatpickr = require("flatpickr");
const mailchimpAPIKey = "f26e6c766b57d6e61e8a24868b66a07b-us18";
const mailchimpURI = "https://us18.api.mailchimp.com/3.0/";

class MailChimp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      templatesIsLoading: true,
      emailIsLoading: true,
      campaignSent: false,
      templates: [],
      lists: [],
      Submit: false,
      segments: [],
    }

    // bind things here
    this.getTemplates = this.getTemplates.bind(this);
    this.getEmailLists = this.getEmailLists.bind(this);
    this.createCampaign = this.createCampaign.bind(this);
    this.getListSegments = this.getListSegments.bind(this);
    this.buildTemplate = this.buildTemplate.bind(this);
    this.buildList = this.buildList.bind(this);

  }

  getTemplates()
  {
    let myHeaders = new Headers();
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(CORS + mailchimpURI + "templates?apikey=" + mailchimpAPIKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({
          templates: jsonData.templates, 
          templatesIsLoading: false
        });        
        console.log(this.state.templates);
      })
      .catch(error => console.log('error', error));
  }

  getEmailLists()
  {
    let myHeaders = new Headers();
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(CORS + mailchimpURI + "lists?apikey=" + mailchimpAPIKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({
          lists: jsonData.lists,
          emailIsLoading: false
        });
        console.log(this.state.lists);
        this.props.callbackForLists(this.state.lists);
      })
      .catch(error => console.log('error', error));

  }

  createCampaign(e)
  {
    e.preventDefault();
    console.log(e);
    console.log( "- - -- - - - - -  - - - - - ");
    console.log(e.target[0][0].value);
    let templateChoice = parseInt(e.target[0].value);
    let segmentChoice = parseInt(e.target[1].value);
     // e.target.templateList.template.value
    // e.target.emailList.list.value

    const form = e.target;
    //const data = new FormData(form);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(
      {
        "id":"",
        "type":"regular",
        "create_time":"2020-05-14T14:15:19+00:00",
        "send_time":"2020-05-20T19:57:26+00:00",
        "content_type":"html",
        "recipients": {
          "list_id":"5daa72e500",
          "list_is_active":true,
          "list_name":"Awaken Pittsburgh",
          "segment_text":"",
          "recipient_count":16,
          "segment_opts": {
            "saved_segment_id": segmentChoice,
            "match": "any",
            "conditions": [
                {
                    "condition_type": "StaticSegment",
                    "field": "static_segment",
                    "op": "static_is",
                    "value": segmentChoice
                }
              ]
            }
          },
          "settings": {
            "subject_line":"You are now enrolled in Test Add!",
            "title":"How Many Times Does This Happen???????",
            "from_name":"Awaken Pittsburgh",
            "reply_to":"awakenprjct@gmail.com",
            "to_name": "*|FNAME|*",
            "authenticate": true,
            "template_id": templateChoice,
          }
        });
  
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/https://us18.api.mailchimp.com/3.0/Campaigns", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      // .then(this.setState({campaignSent: true}))
      .catch(error => console.log('error', error));
    // }
  }

  getListSegments()
  {
  let myHeaders = new Headers();

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

 fetch(CORS + mailchimpURI + "/lists/5daa72e500/segments?apikey=" + mailchimpAPIKey, requestOptions)
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      console.log(jsonData);  
      this.setState({
        segments: jsonData.segments
      });
      this.props.callbackForSegments(this.state.segments);})
  }
  
  componentDidMount()
  {
    this.getTemplates();
    this.getEmailLists();
    this.getListSegments();
  }
  
  buildTemplate(template)
  {
    return (<option name="template" value={template.id} key={template.id}>{template.name}</option>)
  }

  buildList(list)
  {
    return (<option name="list" value={list.id} key={list.id}>{list.name}</option>)
  }

  render ()
  {
    let displayEmailList = [];
    let displayTemplateList = [];
    const { date } = this.state;

    if (!this.state.templatesIsLoading){
      displayTemplateList = this.state.templates.map(this.buildTemplate);
    }
      
    if (!this.state.emailIsLoading){
      displayEmailList = this.state.segments.map(this.buildList);
    }
    
    // e.target.templateList.template.value
    // e.target.emailList.list.value

    return(
      <div className = "menu">
      {/* Drop Down Menu Test for Classes from Airtable */}
      <form className="menu box">
          <label htmlFor="class">Choose a class that you want to email from Airtable:</label>
          <select id="class" name="classes">
              {/* these options should be generated based on what we have in Airtable */}
          </select>
      </form>
      {/* Drop Down Menu Test for Email Templates from Mailchimp */}
      <form onSubmit={this.createCampaign} className="menu box">
          <label htmlFor="template">Choose an email template from MailChimp:</label>
          <select id="templateList" name="templateList"> { displayTemplateList}</select>
          <br></br>
          <label htmlFor="list">Choose an email list from MailChimp:</label>
          <select id="emailList" name="emailList">{ displayEmailList }</select>
          <button>SUBMIT</button>
      </form>

      
      <div>{/* Subject line generator - Currently not fully implemented but this is a good direction to connect to MailChimp Campaigns. */}
        <form>
        <label for="subjectLine">Subject Line:</label><br/>
        <input name="subjectLine" id="subjectLine" list="subjectLines"/>
        </form> 

        <datalist id="subjectLines">
        <option>Spring Meditations</option>
        <option>Yellow</option> 
        <option>Blue</option> 
        <option>Week 2:</option> 
        <option>Orange</option> 
        <option>Purple</option> 
        <option>Black</option> 
        <option>White</option> 
        <option>Gray</option> 
        </datalist>
      </div>

      <Flatpickr
        data-enable-time
        value={date}
        onChange={date => {
          this.setState({ date });
        }}
      />

      </div>
    );
  }
}

export default MailChimp;