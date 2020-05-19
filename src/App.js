import React from 'react';
import './App.css';
// import AirTable from './airtable';
import MailChimp from './mailchimp'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessions:["session 1", "session 2"],
      // submitClicked: false
    }

    // this.sessionListGenerator = this.sessionListGenerator.bind(this);
    // this.submitClicked = this.submitClicked.bind(this);
    //this.state = {
    //
    //};
    //
  }
  

  componentDidMount()
  {
    console.log("let's see if this pops up");
  }



  render() {
 

  return (
    
    <div className="App">
    
    {/* <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>
    </head> */}

    {/* <body> */}
{/* NAV BAR
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
      </nav> */}

      <MailChimp/>
      {/* </body>   */}
    </div>
  );
  }
}


export default App;

