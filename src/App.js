import React from 'react';
import './App.css';


class App extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      emailTemplateLists: ["emailA", "emailB"],
      sessions:["session 1", "session 2"]    
    }
    
    this.emailListGenerator = this.emailListGenerator.bind(this);
    this.sessionListGenerator = this.sessionListGenerator.bind(this);
    //this.state = {
    //
    //};
    //
  }

    //componentDidMount() {
    //  fetch(mailchimpLists)
    //    .then(response => response.json())
    //}

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
    
    <div className="App">

<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="A layout example that shows off a responsive product landing page."/>
    <title>Landing Page &ndash; Layout Examples &ndash; Pure</title>
    <link rel="stylesheet" href="/css/pure/pure-min.css"></link>
    <link rel="stylesheet" href="/css/pure/grids-responsive-min.css"></link>
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"></link>
    <link rel="stylesheet" href="/layouts/marketing/styles.css"></link>
</head>
<body>

<div class="header">
    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <a class="pure-menu-heading" href="">Your Site</a>

        <ul class="pure-menu-list">
            <li class="pure-menu-item pure-menu-selected"><a href="#" class="pure-menu-link">Home</a></li>
            <li class="pure-menu-item"><a href="#" class="pure-menu-link">Tour</a></li>
            <li class="pure-menu-item"><a href="#" class="pure-menu-link">Sign Up</a></li>
        </ul>
    </div>
</div>

<div class="splash-container">
    <div class="splash">
        <h1 class="splash-head">Email Manager</h1>
        <p class="splash-subhead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <p>
            <a href="http://purecss.io" class="pure-button pure-button-primary">Get Started</a>
        </p>
    </div>
</div>

<div class="content-wrapper">
    <div class="content">
        <div class="pure-g">
            <div class="l-box-lrg pure-u-1 pure-u-md-2-5">
                <form class="pure-form pure-form-stacked">
                    <fieldset>

                    <div class="l-box-lrg pure-u-1 pure-u-md-2-5">

                      {/* Drop Down Menu Test for Classes in Airtable */}
                        <form action="/">
                          <label for="class">Choose a class that you want to email:</label>
                          <select id="class" name="classes">
                              {/* these options should be generated based on what we have in Airtable */}
                              {  listOfSessions }
                          </select>
                      </form>

                        {/* Drop Down Menu Test for Email Templates in Mailchimp */}
                        <form action="/">
                          <label for="template">Choose an email template:</label>
                          <select id="template" name="emails">
                              { listOfEmailTemplates}

                          </select>
                      </form>
                      </div>
                    </fieldset>
                </form>
            </div>

            </div>
          </div>

    <div class="ribbon l-box-lrg pure-g">
        <div class="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
            <img width="300" alt="File Icons" class="pure-img-responsive" src="/img/common/file-icons.png"/>
        </div>
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">

            <h2 class="content-head content-head-ribbon">Laboris nisi ut aliquip.</h2>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor.
            </p>
        </div>
    </div>

    <div class="content">
        <h2 class="content-head is-center">Dolore magna aliqua. Uis aute irure.</h2>
    </div>

    <div class="footer l-box is-center">
        footer
    </div>

</div>

</body>

    </div>
    
    
  

    
  );
  }
}


export default App;

