import React from 'react';
import './App.css';
//import { useEffect } from 'react';

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
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "_mcid=1.1ebcc928d439d2d3d9b1ee09a070b504.fbf36732a11449a3cbe72c71f552661db989f91e30f901f9e5eb6eb113c3df30; _AVESTA_ENVIRONMENT=prod; ak_bmsc=70770938853E094C4C89D207F54998B8ACE80944FE5200004C97BC5E6973545B~pledBkBuDC75UQmGXG+Rvhktxr4MEwhQm5wEHWNHuPkVZ7mJUCrfl0tQeug2qPlOqEU8kJ89e1zd/mrUSXGTshWgZP9r8UYMvgzVNeUwxNUg0Re0Y/9Q6fOPjbm0PdbqUGWDy7APvxgXy16gf8GiQE3OnraLSrNSEHggOnelIJJpR8hzsaHl9A2hp9pzOhjo5Gh6/FqRTtIZEninbcbZbhFQOWbkQOH1eyjUz15C5EXuo=; bm_sv=7B1CEF76FA1F5E074266407ED0792CC4~ZCIJiXMoHGWdaOgTpvw6nB0hVzKmRFrZC8xDv4RPKSVN/c/dSAN27kp60ihLtV5fCdQ7jt2Y8LotFx4gNzAJE0ghnilEFpRycDZ82yoJ9oG74jRV6UUrInc5qHGibHh9CDnxm0AX4Kt8CJ9mtW62oLMgINaJW+3IaUVWBAbNO9c=");
  
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
        console.log('got to line 40')
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
    myHeaders.append("Cookie", "_mcid=1.1ebcc928d439d2d3d9b1ee09a070b504.fbf36732a11449a3cbe72c71f552661db989f91e30f901f9e5eb6eb113c3df30; _AVESTA_ENVIRONMENT=prod; ak_bmsc=70770938853E094C4C89D207F54998B8ACE80944FE5200004C97BC5E6973545B~pledBkBuDC75UQmGXG+Rvhktxr4MEwhQm5wEHWNHuPkVZ7mJUCrfl0tQeug2qPlOqEU8kJ89e1zd/mrUSXGTshWgZP9r8UYMvgzVNeUwxNUg0Re0Y/9Q6fOPjbm0PdbqUGWDy7APvxgXy16gf8GiQE3OnraLSrNSEHggOnelIJJpR8hzsaHl9A2hp9pzOhjo5Gh6/FqRTtIZEninbcbZbhFQOWbkQOH1eyjUz15C5EXuo=; bm_sv=7B1CEF76FA1F5E074266407ED0792CC4~ZCIJiXMoHGWdaOgTpvw6nB0hVzKmRFrZC8xDv4RPKSVN/c/dSAN27kp60ihLtV5fCdQ7jt2Y8LotFx4gNzAJE0ghnilEFpRycDZ82yoJ9oG74jRV6UUrInc5qHGibHh9CDnxm0AX4Kt8CJ9mtW62oLMgINaJW+3IaUVWBAbNO9c=");
  
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

      })
      .catch(error => console.log('error', error));

  }

  createCampaign()
  {
    if(!this.state.campaignSent){
    console.log("I'm in the createCampaign function.");
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "_mcid=1.1ebcc928d439d2d3d9b1ee09a070b504.fbf36732a11449a3cbe72c71f552661db989f91e30f901f9e5eb6eb113c3df30; _AVESTA_ENVIRONMENT=prod; ak_bmsc=70770938853E094C4C89D207F54998B8ACE80944FE5200004C97BC5E6973545B~pledBkBuDC75UQmGXG+Rvhktxr4MEwhQm5wEHWNHuPkVZ7mJUCrfl0tQeug2qPlOqEU8kJ89e1zd/mrUSXGTshWgZP9r8UYMvgzVNeUwxNUg0Re0Y/9Q6fOPjbm0PdbqUGWDy7APvxgXy16gf8GiQE3OnraLSrNSEHggOnelIJJpR8hzsaHl9A2hp9pzOhjo5Gh6/FqRTtIZEninbcbZbhFQOWbkQOH1eyjUz15C5EXuo=; bm_sv=7B1CEF76FA1F5E074266407ED0792CC4~ZCIJiXMoHGWdaOgTpvw6nB0hVzKmRFrZC8xDv4RPKSVN/c/dSAN27kp60ihLtV5fCdQ7jt2Y8LotFx4gNzAJE0ghnilEFpRycDZ82yoJ9oG74jRV6UUrInc5qHGibHh9CDnxm0AX4Kt8CJ9mtW62oLMgINaJW+3IaUVWBAbNO9c=");
  
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body:
          {
              //id: "",
              //web_id: 1384388,
              type: "regular",
              create_time: "2020-05-14T14:15:19+00:00",
              //archive_url: "http://eepurl.com/g3xd81",
              //long_archive_url: "https://us18.campaign-archive.com/?u=19e4ec954436ef1a4b744c794&id=004b0eb929",
              status: "save",
              emails_sent: 0,
              send_time: "",
              content_type: "html",
              //needs_block_refresh: false,
              resendable: false,
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
                  reply_to: "awakenprjct@gmail.com",
                  use_conversation: false,
                  to_name: "*|FNAME|*",
                  folder_id: "",
                  authenticate: true,
                  auto_footer: false,
                  inline_css: false,
                  auto_tweet: false,
                  fb_comments: true,
                  timewarp: false,
                  template_id: 0,
                  drag_and_drop: false
              },
              tracking: {
                  opens: true,
                  html_clicks: true,
                  text_clicks: false,
                  goal_tracking: false,
                  ecomm360: false,
                  google_analytics: "",
                  clicktale: "N"
              },
              delivery_status: {
                  enabled: false
              },
              _links: [
                  {
                      rel: "parent",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns",
                      method: "GET",
                      targetSchema: "https://us18.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json",
                      schema: "https://us18.api.mailchimp.com/schema/3.0/CollectionLinks/Campaigns.json"
                  },
                  {
                      rel: "self",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929",
                      method: "GET",
                      targetSchema: "https://us18.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json"
                  },
                  {
                      rel: "delete",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929",
                      method: "DELETE"
                  },
                  {
                      rel: "send",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/actions/send",
                      method: "POST"
                  },
                  {
                      rel: "cancel_send",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/actions/cancel-send",
                      method: "POST"
                  },
                  {
                      rel: "feedback",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/feedback",
                      method: "GET",
                      targetSchema: "https://us18.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json"
                  },
                  {
                      rel: "content",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/content",
                      method: "GET",
                      targetSchema: "https://us18.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json"
                  },
                  {
                      rel: "send_checklist",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/send-checklist",
                      method: "GET",
                      targetSchema: "https://us18.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json"
                  },
                  {
                      rel: "pause",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/actions/pause",
                      method: "POST"
                  },
                  {
                      rel: "resume",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/actions/resume",
                      method: "POST"
                  },
                  {
                      rel: "replicate",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/actions/replicate",
                      method: "POST"
                  },
                  {
                      rel: "create_resend",
                      href: "https://us18.api.mailchimp.com/3.0/campaigns/004b0eb929/actions/create-resend",
                      method: "POST"
                  }
              ]
          }
        };
    fetch(mailchimpURI + "campaigns?apikey=" + mailchimpAPIKey, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
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
    let display = [];
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