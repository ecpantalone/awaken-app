import React from 'react';
import './App.css';
import './flatpickr.css';
import AirTable from './airtable';
import Formmenu from './formmenu';
import MailChimp from './mailchimp';
import UpdateMailchimp from './updatemailchimp';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailTemplateLists: ["emailA", "emailB"],
      showDB: false,
      showEM: false, 
      sessions: [],
      students: [],
      lists: [],
      segments: [],
      members: []
    }

    this.airtableSessionsCallback = this.airtableSessionsCallback.bind(this);
    this.airtableStudentsCallback = this.airtableStudentsCallback.bind(this);
    this.mailchimpListsCallback = this.mailchimpListsCallback.bind(this);
    this.mailchimpSegmentsCallback = this.mailchimpSegmentsCallback.bind(this);
    this.mailchimpMembersCallback = this.mailchimpMembersCallback.bind(this);
  }
  
  airtableSessionsCallback = (airtableSessions) => {
    this.setState({
      sessions: airtableSessions
  });
  }

  airtableStudentsCallback = (airtableStudents) => {
    this.setState({
      students: airtableStudents
  });
  }

  mailchimpListsCallback = (mailchimpLists) => {
    this.setState({
      lists: mailchimpLists
  });
  }

  mailchimpSegmentsCallback = (mailchimpSegments) => {
    this.setState({
      segments: mailchimpSegments
  });
  }

  mailchimpMembersCallback = (mailchimpMembers) => {
    this.setState({
      members: mailchimpMembers
  });
  }

  componentDidMount() {
    this.airtableSessionsCallback();
    this.airtableStudentsCallback();
    this.mailchimpListsCallback();
    this.mailchimpSegmentsCallback();
    this.mailchimpMembersCallback();
    }

  render() {

  let listOfEmailTemplates = [];
  let listOfSessions = [];
    
  const { showDB } = this.state;
  const { showEM } = this.state;

  // listOfEmailTemplates = this.state.emailTemplateLists.map(this.emailListGenerator);
  // listOfSessions = this.state.sessions.map(this.sessionListGenerator);

  return (
    <div>
    <div className="App">
    <div className="container">
    


      <div class = "updater">
        {<UpdateMailchimp sessions = {this.state.sessions} students = {this.state.students} lists = {this.state.lists} segments = {this.state.segments} members = {this.state.members}/>}
        {<AirTable callbackForStudents= {this.airtableStudentsCallback} callbackForSessions = {this.airtableSessionsCallback}/>}
      </div>

        <img className="logo" img src="https://cdn-az.allevents.in/banners/34f81faeb09b04cf6c85354a6d3baa44-rimg-w2087-h1398-gmir.jpg"
        ></img>
        <div className="headers">


          <header id="AdminPortaltext">ADMIN PORTAL</header>
        </div>

        <div className="button" onClick={() => this.setState({ showDB: !showDB })}>
          <div className="buttontext">MANAGE DATABASE</div>
        </div>
        {showDB ? <Formmenu/> : null}
        <div className="button" onClick={() => this.setState({ showEM: !showEM })}>
          <div className="buttontext">SEND CLASS EMAILS</div>
        </div>
        {showEM ? <MailChimp callbackForLists={this.mailchimpListsCallback} callbackForSegments={this.mailchimpSegmentsCallback} callbackForMembers={this.mailchimpMembersCallback} /> : null}

        <div className="footer">
          <footer>Connect Mindfully. Live Fully.</footer>
        </div>
      </div>
      </div>
      </div>

  );
  }
}


export default App;

