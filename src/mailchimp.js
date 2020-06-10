import './App.css';
import React from 'react';
import './flatpickr.css';
import Flatpickr from "react-flatpickr";
import { Component } from "react";


// these need to go into an .env file and be gitignored
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
      subject: "Test",
      segments: [],
      members: [],
      campaignId: ""

    }

    // bind things here
    this.getTemplates = this.getTemplates.bind(this);
    this.getEmailLists = this.getEmailLists.bind(this);
    this.createCampaign = this.createCampaign.bind(this);
    this.getListSegments = this.getListSegments.bind(this);
    this.buildTemplate = this.buildTemplate.bind(this);
    this.buildList = this.buildList.bind(this);

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

  // modifyCampaignStatus(e){
  //   // we want this to be a patch of the latest campaign. 
  //   // the id of this is available at this.state.id - createCampaign sets this state every time
  //   // campaigns/CAMPAIGNID/actions/schedule
  //   e.preventDefault();
  //   console.log(e);
  //   console.log( "- - -- - - - - -  - - - - - ");
  //   console.log(e.target[0][0].value);
  //   console.log(String(this.state.date));
  //   // console.log((this.state.date).toISOString());
  //   let time = (this.state.date).toISOString();
  //   time = time.substring(0, time.length - 5) + "+00:00";
  //   console.log(time);
  //   let templateChoice = parseInt(e.target[0].value);
  //   let segmentChoice = parseInt(e.target[1].value);
  //   let listChoice = parseInt(e.target[1].value);
  //   let dummyTime = "2020-05-21T20:30:32+00:00";
  //    // e.target.templateList.template.value
  //   // e.target.emailList.list.value

  //   const form = e.target;
  //   //const data = new FormData(form);

  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Basic YXBpa2V5OmM0ZmFmMGM2NmRkMjhmZTBiZWJmMmE2Y2NlNWQ0NzVlLXVzMTE=");
  //   myHeaders.append("Content-Type", "application/json");

  //   let raw = JSON.stringify(
  //     {
  //       "id":"",
  //       "status": "schedule",
  //       "type":"regular",
  //       "create_time":time,
  //       "send_time":dummyTime,
  //       "content_type":"html",
  //       "recipients": {
  //         "list_id":"f3e30ff0d3",
  //         "list_is_active":true,
  //         "list_name":"",
  //         "segment_text":"",
  //         "recipient_count":16,
  //         // "segment_opts": {
  //         //   "saved_segment_id": segmentChoice,
  //         //   "match": "any",
  //         //   "conditions": [
  //         //       {
  //         //           "condition_type": "StaticSegment",
  //         //           "field": "static_segment",
  //         //           "op": "static_is",
  //         //           "value": segmentChoice
  //         //       }
  //         //     ]
  //         //   }
  //         },
  //         "settings": {
  //           "subject_line":"Email test on Thursday",
  //           "title":"How Many Times Does This Happen???????",
  //           "from_name":"Awaken Pittsburgh",
  //           "reply_to":"awakenprjct@gmail.com",
  //           "to_name": "*|FNAME|*",
  //           "authenticate": true,
  //           "template_id": templateChoice,
  //         }
  //       });
  
  //   let requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("http://localhost:8080/https://us11.api.mailchimp.com/3.0/Campaigns/" + this.state.campaignId + "/actions/schedule", requestOptions)
  //   // this is new copied from getEmail lists
  //   // 
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(jsonData => {
  //     console.log(jsonData);
  //     this.setState({
  //       campaignId: jsonData.id,
  //       // emailIsLoading: false
  //     });
  //     console.log(this.state.campaignId);
  //     // this.props.callbackForLists(this.state.lists);
  //   })    
  //   // // this was how it used to be
  //   // 
  //   //   .then(response => response.json())
  //   //   .then(result => id = result.id)
  //   //   // .then(result => console.log(result.id))
  //   //   // .then(result => id = result.id)
  //   //   .then(console.log("ID - - - - - "))
  //   //   .then(console.log(id))
  //   //   // .then(this.setState({campaignSent: true}))
  //     .catch(error => console.log('error', error));
  //   // }
  // }

  createCampaign(e) {
    // let id = "";
    e.preventDefault();
    console.log(e);
    console.log( "- - -- - - - - -  - - - - - ");
    console.log(e.target[0][0].value);
    console.log(String(this.state.date));
    // console.log((this.state.date).toISOString());
    let time = (this.state.date).toISOString();
    time = time.substring(0, time.length - 5) + "+00:00";
    // console.log(time);
    let templateChoice = parseInt(e.target[0].value);
    let segmentChoice = parseInt(e.target[1].value);
    let listChoice = parseInt(e.target[1].value);
    let dummyTime = "2020-05-21T20:30:00+00:00";
     // e.target.templateList.template.value
    // e.target.emailList.list.value

    const form = e.target;
    //const data = new FormData(form);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YXBpa2V5OmM0ZmFmMGM2NmRkMjhmZTBiZWJmMmE2Y2NlNWQ0NzVlLXVzMTE=");
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
          "list_id":"f3e30ff0d3",
          "list_is_active":true,
          "list_name":"",
          "segment_text":"",
          "recipient_count":16,
          // "segment_opts": {
          //   "saved_segment_id": segmentChoice,
          //   "match": "any",
          //   "conditions": [
          //       {
          //           "condition_type": "StaticSegment",
          //           "field": "static_segment",
          //           "op": "static_is",
          //           "value": segmentChoice
          //       }
          //     ]
          //   }
          },
          "settings": {
            "subject_line":"boogaloo",
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
  
    
  //   fetch("http://localhost:8080/https://us11.api.mailchimp.com/3.0/Campaigns/" + this.state.campaignId + "/actions/schedule", requestOptions)
  //   // fetch("http://localhost:8080/https://us11.api.mailchimp.com/3.0/Campaigns", requestOptions)
  //   // this is new copied from getEmail lists
  //   // 
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(jsonData => {
  //     console.log(jsonData);
  //     this.setState({
  //       campaignId: jsonData.id,
  //       // emailIsLoading: false
  //     });
  //     console.log(this.state.campaignId);
  //     // this.props.callbackForLists(this.state.lists);
  //   })    
  //   // // this was how it used to be
  //   // 
  //   //   .then(response => response.json())
  //   //   .then(result => id = result.id)
  //   //   // .then(result => console.log(result.id))
  //   //   // .then(result => id = result.id)
  //   //   .then(console.log("ID - - - - - "))
  //   //   .then(console.log(id))
  //   //   // .then(this.setState({campaignSent: true}))
  //     .catch(error => console.log('error', error));
  //   // }
  // }

  //currently not in use with the LFG account

getListSegments() {
  let myHeaders = new Headers();

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(CORS + this.props.url + "/lists/f3e30ff0d3/segments?apikey=" + this.props.apiKey, requestOptions)
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

    fetch(CORS + this.props.url + "/lists/f3e30ff0d3/members?count=1000&status=subscribed&apikey=" + this.props.apiKey, requestOptions)
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
    
    // e.target.templateList.template.value
    // e.target.emailList.list.value

    return(
      <div className = "menu">
      {/* Drop Down Menu Test for Classes from Airtable */}
      {/* <form className="menu box">
          <label htmlFor="class">Choose a class that you want to email from Airtable:</label>
          <select id="class" name="classes">
          </select>
      </form> */}


      {/* Drop Down Menu Test for Email Templates from Mailchimp */}
      {/* <form onSubmit={this.createCampaign}> */}
      <form>
      
        <div className="form-box">
          <label htmlFor="template">choose TEMPLATE:</label><br />
          <select className="select-css" id="templateList" name="templateList">
            <option>Welcome Message</option>
            <option>Week 1 Message</option>
            <option>Week 2 Message</option>
            {/* <option>This is a test option that is really, really, really long!</option>  */}
            { displayTemplateList }
          </select>
          </div>
       
        <div className="form-box">
          <label htmlFor="list">choose SESSION:</label><br />
          <select className="select-css" id="emailList" name="emailList">
            <option>Fall 2020 Homestead</option>
            <option>Fall 2020 Munhall</option>
            <option>Spring 2021 Homestead</option>
            {/* <option>This is a test option that is really, really, really, really, really, really, really long!</option> */}
            { displayEmailList }
          </select>
        </div>
        
      {/* </form> */}

      
       { /* Subject line generator - Currently not fully implemented but this is a good direction to connect to MailChimp Campaigns. */}
       <div className="form-box">
        {/* <form> */}
        <label for="subjectLine">SUBJECT LINE:</label><br/>
        <input className="select-css" name="subjectLine" id="subjectLine" list="subjectLines" />
        {/* value={this.state.subject}
        onChange={this.state.subject => {
          this.setState({ subject });
        }} */}
        {/* </form>  */}

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
        {/* <button>SUBMIT</button> */}
      </form>
    </div>
    
    );
  }
}

export default MailChimp;