import React from 'react';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';
import EmailLists from './emaillists';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {  
      sessions: [],
      students: [],
      lists: [],
      segments: []
    }

    this.airtableSessionsCallback = this.airtableSessionsCallback.bind(this);
    this.airtableStudentsCallback = this.airtableStudentsCallback.bind(this);
    this.mailchimpListsCallback = this.mailchimpListsCallback.bind(this);
    this.mailchimpSegmentsCallback = this.mailchimpSegmentsCallback.bind(this);
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

  componentDidMount() {
    this.airtableSessionsCallback();
    this.airtableStudentsCallback();
    this.mailchimpListsCallback();
    this.mailchimpSegmentsCallback();
    }

  render() {

  return (
    
    <div className="App">
    
      < MailChimp callbackForLists={this.mailchimpListsCallback} callbackForSegments={this.mailchimpSegmentsCallback} /> 
      lallalaalal
      
      <div class = "list">
        {<EmailLists sessions = {this.state.sessions} students = {this.state.students} lists = {this.state.lists} segments = {this.state.segments} />}
      </div>

      <div class = "menu">
        {/* Drop Down Menu Test for Classes in Airtable */}
        <form action="/" class="menu box">
            <label for="class">Choose a class that you want to email:</label>
            <select id="class" name="classes">
                {/* these options should be generated based on what we have in Airtable */}
                {  <AirTable callbackForSessions={this.airtableSessionsCallback} callbackForStudents={this.airtableStudentsCallback}/>}
            </select>
        </form>
      </div>
    </div>
  );
  }
}


export default App;

