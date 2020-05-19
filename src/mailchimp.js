import React from 'react';
import './App.css';

// these need to go into an .env file and be gitignored
const CORS = "http://localhost:8080/";
const mailchimpAPIKey = "de3be56ee674cb1b6c68d16d40784d34-us18";
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
      Submit: false
    }

    // bind things here
    this.getTemplates = this.getTemplates.bind(this);
    this.getEmailLists = this.getEmailLists.bind(this);
    this.createCampaign = this.createCampaign.bind(this);
    this.buildTemplate = this.buildTemplate.bind(this);
    this.buildList = this.buildList.bind(this);

  }


  getTemplates()
  {
    let requestOptions = {
      method: 'GET',
      headers: new Headers ({
        "Authorization": `Basic ${new Buffer(`apikey:${mailchimpAPIKey}`).toString('base64')}`
      }),
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
    let requestOptions = {
      method: 'GET',
      headers: new Headers ({
        "Authorization": `Basic ${new Buffer(`apikey:${mailchimpAPIKey}`).toString('base64')}`
      }),
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

      })
      .catch(error => console.log('error', error));

  }

  createCampaign()
  {
    if(!this.state.campaignSent)
    {
    console.log("I'm in the createCampaign function.");
  
    let requestOptions = {
      method: 'POST',
      headers: new Headers ({
        "Authorization": `Basic ${new Buffer(`apikey:${mailchimpAPIKey}`).toString('base64')}`
      }),
      redirect: 'follow',
      body:
      {
        id: "",
        type: "regular",
        create_time: "2020-05-14T14:15:19+00:00",
        emails_sent: 0,
        send_time: "",
        content_type: "html",
        recipients: {
            list_id: "5daa72e500",
            list_is_active: true,
            list_name: "Awaken Pittsburgh",
            segment_text: "",
            recipient_count: 16
        },
        settings: {
            subject_line: "You are now enrolled in Test Add!",
            preview_text: "Classes start on ",
            title: "Test Add - Added from Airtable",
            from_name: "Awaken Pittsburgh",
            reply_to: "awakenprjct@gmail.com"
        }
      }
    };

    fetch(CORS + mailchimpURI + "Campaigns?apikey=" + mailchimpAPIKey, requestOptions)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(jsonData => {
        // console.log(response);
        this.setState({
          campaigns: jsonData.campaigns,
          campaignSent: true
        });
      })
      .catch(error => console.log('error', error));

  }
}

  componentDidMount()
  {
     this.getTemplates();
     this.getEmailLists();
     this.createCampaign();
  }
  
  buildTemplate(template)
  {
    return (<option value={template.id} key={template.id}>{template.name}</option>)
  }

  buildList(list)
  {
    return (<option value={list.id} key={list.id}>{list.name}</option>)
  }

  render (){
    let displayEmailList = [];
    let displayTemplateList = [];

    if (!this.state.templatesIsLoading){
      displayTemplateList = this.state.templates.map(this.buildTemplate);
    }
      
    if (!this.state.emailIsLoading){
      displayEmailList = this.state.lists.map(this.buildList);
    }
    

    return(
      // <React.Fragment>
      // {display}
      // </React.Fragment>
      <div className = "menu">
      {/* Drop Down Menu Test for Classes in Airtable */}
      <form action="/" className="menu box">
          <label htmlFor="class">Choose a class that you want to email:</label>
          <select id="class" name="classes">
              {/* these options should be generated based on what we have in Airtable */}
          </select>
      </form>
      {/* Drop Down Menu Test for Email Templates in Mailchimp */}
      <form action="/" className="menu box">
          <label htmlFor="template">Choose an email template:</label>
          <select id="template" name="emails"> { displayTemplateList}</select>
          <br></br>
          <label htmlFor="list">Choose an email list:</label>
          <select id="list" name="lists">{ displayEmailList }</select>
          {/*  we want to get that template and list and add it together to make a campaign (in POST/campaign)*/}
          <input type="submit" key="submit" value={this.state.Submit} onClick={this.createCampaign()}></input>  
      </form>
      </div>
    );
    
  }
}

export default MailChimp;