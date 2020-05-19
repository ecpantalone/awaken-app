import React from 'react';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp'

// this is a test comment
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailTemplateLists: ["emailA", "emailB"],
      sessions:["session 1", "session 2"]    
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

  listOfEmailTemplates = this.state.emailTemplateLists.map(this.emailListGenerator);
  listOfSessions = this.state.sessions.map(this.sessionListGenerator);


  return (
    
    //  <div className="App">
    
    //  <head>
    //    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>
    //  </head>

    //  <body>

    //    {/* Nav Bar */}
    //    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //      <img src="https://cdn-az.allevents.in/banners/34f81faeb09b04cf6c85354a6d3baa44-rimg-w2087-h1398-gmir.jpg" class="logo"></img>
    //      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span class="navbar-toggler-icon"></span>
    //      </button>

      //    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      //      <ul class="navbar-nav mr-auto">
      //        <li class="nav-item active">
      //          <a class="nav-link" href="#">Schedule Emails</a>
      //        </li>
      //        <li class="nav-item">
      //          <a class="nav-link" href="#">Update Database <span class="sr-only">(current)</span></a>
      //        </li>
      //      </ul>
      //    </div>
      //  </nav>

//        <div class = "menu">
//          {/* Drop Down Menu Test for Classes in Airtable */}
//          <form action="/" class="menu box">
//              <label for="class">Choose a class that you want to email:</label>
//              <select id="class" name="classes">
//                  {/* these options should be generated based on what we have in Airtable */}
//                  {  listOfSessions }
//              </select>
//          </form>
//          {/* Drop Down Menu Test for Email Templates in Mailchimp */}
//          <form action="/" class="menu box">
//              <label for="template">Choose an email template:</label>
//              <select id="template" name="emails">
//                  {  <MailChimp/> } // john knows how to fix this... we have a server issue

//                  {/* { listOfEmailTemplates} */}
//              </select>
//          </form>

//          </div>
//        </body>  
//      </div>

//    );
//    }
//  }


// export default App;

// <!DOCTYPE html>
/* <html lang="en"> */
<div className="App">
  <div className="container">
  <img className="logo" img src="https://cdn-az.allevents.in/banners/34f81faeb09b04cf6c85354a6d3baa44-rimg-w2087-h1398-gmir.jpg"
      ></img>
    <div className="headers">
      
      <header id="AdminPortaltext">ADMIN PORTAL</header>
    </div>
      <button>
        <div className="button">MANAGE DATABASE</div>
      </button>
    <button>
        <div className="button">SEND CLASS EMAILS</div>
    </button>

    <div className="footer">
    <footer>Connect Mindfully. Live Fully.</footer>
    </div>
  </div>
</div>


 );
 
 }
}
export default App;
