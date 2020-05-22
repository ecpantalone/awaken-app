import React from 'react';
import './App.css';

// these need to go into an .env file and be gitignored
const CORS = "http://localhost:8080/";
const mailchimpAPIKey = "f26e6c766b57d6e61e8a24868b66a07b-us18";
const mailchimpURI = "https://us18.api.mailchimp.com/3.0/";

class MailChimp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templatesIsLoading: true,
      emailIsLoading: true,
      campaignSent: false,
      templates: [],
      lists: [],
      Submit: false,
      segments: [],
      members: []
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

    fetch(CORS + mailchimpURI + "templates?apikey=" + mailchimpAPIKey, requestOptions)
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

    fetch(CORS + mailchimpURI + "lists?apikey=" + mailchimpAPIKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        //  console.log(jsonData);
        this.setState({
          lists: jsonData.lists,
          emailIsLoading: false
        });
        // console.log(this.state.lists);
        this.props.callbackForLists(this.state.lists);
      })
      .catch(error => console.log('error', error));

  }

  createCampaign() {
    console.log("in createCampaign");
    if (!this.state.campaignSent) {
      console.log("I'm in the createCampaign function.");

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify(
        {
          "id": "",
          "type": "regular",
          "create_time": "2020-05-14T14:15:19+00:00",
          "emails_sent": 0,
          "send_time": "",
          "content_type": "html",
          "recipients": {
            "list_id": "5daa72e500",
            "list_is_active": true,
            "list_name": "Awaken Pittsburgh",
            "segment_text": "", "recipient_count": 16
          },
          "settings": {
            "subject_line": "You are now enrolled in Test Add!",
            "preview_text": "Classes start on ",
            "title": "How Many Times Does This Happen???????",
            "from_name": "Awaken Pittsburgh",
            "reply_to": "awakenprjct@gmail.com"
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
        .then(this.setState({ campaignSent: true }))
        .catch(error => console.log('error', error));
    }
  }

  getListSegments() {
    let myHeaders = new Headers();

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(CORS + mailchimpURI + "/lists/5daa72e500/segments?count=1000&apikey=" + mailchimpAPIKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        // console.log(jsonData);  
        this.setState({
          segments: jsonData.segments
        });
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

    fetch(CORS + mailchimpURI + "/lists/5daa72e500/members?count=1000&status=subscribed&apikey=" + mailchimpAPIKey, requestOptions)
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

  buildTemplate(template) {
    return (<option value={template.id} key={template.id}>{template.name}</option>)
  }

  buildList(list) {
    return (<option value={list.id} key={list.id}>{list.name}</option>)
  }

  render() {
    let displayEmailList = [];
    let displayTemplateList = [];

    if (!this.state.templatesIsLoading) {
      displayTemplateList = this.state.templates.map(this.buildTemplate);
    }

    if (!this.state.emailIsLoading) {
      displayEmailList = this.state.lists.map(this.buildList);
    }


    return (
      <div className="menu">
        {/* Drop Down Menu Test for Classes from Airtable */}
        <form action="/" className="menu box">
          <label htmlFor="class">Choose a class that you want to email from Airtable:</label>
          <select id="class" name="classes">
            {/* these options should be generated based on what we have in Airtable */}
          </select>
        </form>
        {/* Drop Down Menu Test for Email Templates from Mailchimp */}
        <form action="/" className="menu box">
          <label htmlFor="template">Choose an email template from MailChimp:</label>
          <select id="template" name="emails"> {displayTemplateList}</select>
          <br></br>
          <label htmlFor="list">Choose an email list from MailChimp:</label>
          <select id="list" name="lists">{displayEmailList}</select>
          {/*  we want to get that template and list and add it together to make a campaign (in POST/campaign)*/}
          {/*<button onClick={() => this.createNewSessionList(list)}> Add List </button>*/}
          {/* <input type="submit" key="submit" value={this.state.Submit} onClick={() => this.createCampaign()}></input>   */}
          {/* <input type="submit" key="submit" value={this.state.Submit} onClick={this.createCampaign()}></input>   */}
        </form>
      </div>
    );
  }
}

export default MailChimp;