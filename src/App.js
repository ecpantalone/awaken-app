import React from 'react';
import './App.css';
import AirTable from './airtable';
import Formmenu from './formmenu';
import MailChimp from './mailchimp';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailTemplateLists: ["emailA", "emailB"],
      sessions: ["session 1", "session 2"], 
      showDB: false,
      showEM: false
    }
    
    this.loadEmails = this.loadEmails.bind(this);
    this.loadSessions = this.loadSessions.bind(this);
    this.emailListGenerator = this.emailListGenerator.bind(this);
    this.sessionListGenerator = this.sessionListGenerator.bind(this);
    //this.state = {
    //
    //};
    //
  }
  
  componentDidMount()
  {
    this.loadEmails();
    this.loadSessions()
    console.log(this.state.movies);
  }

  loadEmails(){
      // "Connect" this to the mailchimp.js file
    return "";
  }

  loadSessions(){
    console.log(this.props.getSessions)
    return "";
  }

  emailListGenerator(email){
    return (<option value={email}>{email}</option>);
  }
  sessionListGenerator(session){
    return (<option value={session}>{session}</option>);
  }

  render() {
  let listOfEmailTemplates = [];
  let listOfSessions = [];
    
  const { showDB } = this.state;
  const { showEM } = this.state;

  listOfEmailTemplates = this.state.emailTemplateLists.map(this.emailListGenerator);
  listOfSessions = this.state.sessions.map(this.sessionListGenerator);


  return (
    <div>
    <div className="App">
    <div className="container">
    
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
        {showEM ? <MailChimp /> : null}

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

