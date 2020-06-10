import './App.css';
import React from 'react';
import './flatpickr.css';
import Flatpickr from "react-flatpickr";
import { Component } from "react";


const CORS = "http://localhost:8080/";
// const flatpickr = require("flatpickr");


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
      subject: "",
      segments: [],
      members: [],
      templateId: '',
      segmentId: '',
      campaignId: ""

    }

    // bind things here
    this.getTemplates = this.getTemplates.bind(this);
    this.getEmailLists = this.getEmailLists.bind(this);
    this.createCampaign = this.createCampaign.bind(this);
    this.getListSegments = this.getListSegments.bind(this);
    this.buildTemplate = this.buildTemplate.bind(this);
    this.buildList = this.buildList.bind(this);
    this.setTemplate = this.setTemplate.bind(this);
    this.setSegment = this.setSegment.bind(this);
    this.setSubject = this.setSubject.bind(this);
  }

  getTemplates() {
    let myHeaders = new Headers();

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(CORS + this.props.url + "templates?apikey=" + this.props.apiKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        // console.log(jsonData);
        this.setState({
          templates: jsonData.templates,
          templatesIsLoading: false
        });
        // console.log(this.state.templates);
      })
      .catch(error => console.log('error', error));
  }

  getEmailLists() {
    let myHeaders = new Headers();

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(CORS + this.props.url + "lists?apikey=" + this.props.apiKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        //  console.log(jsonData);
        this.setState({
          lists: jsonData.lists,
          emailIsLoading: false
        });
        console.log(this.state.lists);
        this.props.callbackForLists(this.state.lists);
      })
      .catch(error => console.log('error', error));

  }

  createCampaign(e) {
    // let id = "";
    e.preventDefault();
    console.log(e);
    console.log( "- - -- - - - - -  - - - - - ");
    console.log(String(this.state.date));
    let time = (this.state.date).toISOString();
    time = time.substring(0, time.length - 5) + "+00:00";
    let templateChoice = parseInt(this.state.templateId);
    // let segmentChoice = this.state.segmentId;
    // let listChoice = parseInt(e.target[1].value);
    let dummyTime = "2020-05-21T20:30:00+00:00";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YXBpa2V5OmM0ZmFmMGM2NmRkMjhmZTBiZWJmMmE2Y2NlNWQ0NzVlLXVzMTE=");
    //myHeaders.append("Authorization", "Basic");
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(
      {
        "id":"",
        "status": "schedule",
        "type":"regular",
        "create_time":time,
        "send_time": "2020-05-21T21:00:00+00:00",
        "content_type":"html",
        "recipients": {
          "list_id": this.props.listId,
          "list_is_active":true,
          "list_name":"",
          "segment_text":"",
          "recipient_count":16,
          },
          "settings": {
            "subject_line":this.state.subject,
            "title":"boogie time production",
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

      fetch("http://localhost:8080/https://us11.api.mailchimp.com/3.0/Campaigns", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(this.setState({ campaignSent: true }))
        .catch(error => console.log('error', error));
    }
  

getListSegments() {
  let myHeaders = new Headers();

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(CORS + this.props.url + "/lists/" + this.props.listId + "/segments?apikey=" + this.props.apiKey, requestOptions)
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      console.log(jsonData);
      this.setState({
        segments: jsonData.segments
      })
      this.props.callbackForSegments(this.state.segments);
    })
}

  getListMembers() {
    let myHeaders = new Headers();
    let raw = JSON.stringify(
      {
        "fields": "tags",
      });

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(CORS + this.props.url + "/lists/" + this.props.listId + "/members?count=1000&status=subscribed&apikey=" + this.props.apiKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        // console.log(jsonData);  
        this.setState({
          members: jsonData.members
        });
        this.props.callbackForMembers(this.state.members);
      })
  }


  componentDidMount() {
    this.getTemplates();
    this.getEmailLists();
    this.getListSegments();
    this.getListMembers();
  }


  
  buildTemplate(template)
  {
    return (<option name="template" value={template.id} key={template.id}>{template.name}</option>)
  }

  buildList(list)
  {
    return (<option name="list" value={list.id} key={list.id}>{list.name}</option>)
  }

  setTemplate(e) {
    e.preventDefault();
    this.setState({templateId: e.target.value}, function () {
      console.log("templateId", this.state.templateId);
    });
  }

  setSegment(e) {
    e.preventDefault();
    this.setState({segmentId: e.target.value}, function () {
      console.log("segmentId", this.state.segmentId);
    });
  }

  setSubject(e) {
    e.preventDefault();
    this.setState({subject: e.target.value}, function () {
      console.log("subject", this.state.subject);
    });
  }

  render() {
    let displayEmailList = [];
    let displayTemplateList = [];
    const { date } = this.state;

    if (!this.state.templatesIsLoading) {
      displayTemplateList = this.state.templates.map(this.buildTemplate);
    }
      
    if (!this.state.emailIsLoading){
      //this will need to be segments, not lists
      displayEmailList = this.state.lists.map(this.buildList);
    }
    

    return(
      <div className = "menu">
    
      <form>
      
        <div className="form-box">
          <label htmlFor="template">choose TEMPLATE:</label><br />
          <select className="select-css" id="templateList" name="templateList" onChange={this.setTemplate}>
            { displayTemplateList }
          </select>
          </div>
       
        <div className="form-box">
          <label htmlFor="list">choose SESSION:</label><br />
          <select className="select-css" id="emailList" name="emailList" onChange={this.setSegment}>
            <option>Fall 2020 Homestead</option>
            <option>Fall 2020 Munhall</option>
            <option>Spring 2021 Homestead</option>
            { displayEmailList }
          </select>
        </div>
        

      
       { /* Subject line generator - Currently not fully implemented but this is a good direction to connect to MailChimp Campaigns. */}
       <div className="form-box">
        <label for="subjectLine">SUBJECT LINE:</label><br/>
        <input className="select-css" name="subjectLine" id="subjectLine" onChange={this.setSubject} list="subjectLines" />

        <datalist id="subjectLines">
        <option>Spring Meditations</option>
        <option>Week 2:</option> 
        </datalist>
      </div>
      <div className="form-box">
      <label>schedule DATE/TIME:</label><br />
      
      <Flatpickr 
        data-enable-time
        value={date}
        onChange={date => {
          this.setState({ date });
        }}
      /> 
      </div>
      <div className="form-button" onClick={this.createCampaign}>SCHEDULE</div>
      </form>
    </div>
    
    );
  }
}

export default MailChimp;