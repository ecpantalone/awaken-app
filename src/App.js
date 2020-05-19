import React from 'react';
import './App.css';
// import AirTable from './airtable';
import MailChimp from './mailchimp'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessions:["session 1", "session 2"]    
    }

    this.sessionListGenerator = this.sessionListGenerator.bind(this);
    //this.state = {
    //
    //};
    //
  }
  
  componentDidMount()
  {
    
    console.log("let's see if this pops up");
  }

  sessionListGenerator(session){
    return (<option value={session}>{session}</option>);
  }

  render() {
  let listOfSessions = [];

  listOfSessions = this.state.sessions.map(this.sessionListGenerator);


  return (
    
    <div className="App">
    
    <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>
    </head>

    <body>

      {/* Nav Bar */}
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img src="https://cdn-az.allevents.in/banners/34f81faeb09b04cf6c85354a6d3baa44-rimg-w2087-h1398-gmir.jpg" class="logo"></img>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <a class="nav-link" href="#">Schedule Emails</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Update Database <span class="sr-only">(current)</span></a>
            </li>
           </ul>
        </div>
      </nav>

      <div class = "menu">
        {/* Drop Down Menu Test for Classes in Airtable */}
        <form action="/" class="menu box">
            <label for="class">Choose a class that you want to email:</label>
            <select id="class" name="classes">
                {/* these options should be generated based on what we have in Airtable */}
                {  listOfSessions }
            </select>
        </form>
        {/* Drop Down Menu Test for Email Templates in Mailchimp */}
        <form action="/" class="menu box">
            <label for="template">Choose an email template:</label>
            <select id="template" name="emails"> {  <MailChimp mode = "templateList"/> }</select>
            <br></br>
            <label for="list">Choose an email list:</label>
            <select id="list" name="lists">{  <MailChimp mode = "emailList" /> }</select>  
        </form>
        </div>
      </body>  
    </div>

  );
  }
}


export default App;

