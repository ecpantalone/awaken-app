import React from 'react';
import './App.js';
import './App.css';
import request from 'request';

// need to run "npm install airtable" in the console
// New  Branch created for Forms

const AirtableVar = require('airtable');
AirtableVar.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyn1hpKbx5jhKY7i'
});
const base = AirtableVar.base('appfQdjvtsNvuwzHF');

//let sessionsList = [];
let studentsList = [];

class Forms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // sessions: [],
            name: "",
            email: "",
            studentsInfo: []
        };
        //this.getSessions = this.getSessions.bind(this);
        this.getStudents = this.getStudents.bind(this);
        //this.buildSessions = this.buildSessions.bind(this);
        this.checkDups = this.checkDups.bind(this);

    }
    
    componentDidMount() {
        console.log("inside of component did mount");
        this.getStudents();
        this.setState({studentsInfo: studentsList});
     }

    // getSessions() {
    //     base('Session').select({
    //         view: "Grid view"
    //     }).eachPage(function page(records, fetchNextPage) {

    //         records.forEach(function (record) {
    //             sessionsList.push(record.get('Session'));
    //             console.log("inside of get sessions");
    //         });
    //         fetchNextPage();

    //     }, function done(err) {
    //         if (err) { console.error(err); return; }
    //     });

        
    // }


    // this function needs to be called by a selection on the dropdown list in the main app
    // getStudents(sessionid) {
    //     base('Students').select({
    //         view: sessionid // this is the name of the view i.e. "Grid View" for all students "Session X" for a single session
    //     }).eachPage(function page(records, fetchNextPage) {
        
    //         records.forEach(function(record) {
    //             studentsList.push(record.get('EmailAddress'));
    //         });
    //         fetchNextPage();
        
    //     }, function done(err) {
    //         if (err) { console.error(err); return; }
    //     });
    // }

    getStudents(){
        let fullName = ""
        // base('Students').find('testing@gmail.com', function(err, record) {
        //     if (err) { console.error(err); return; }
        //     console.log('Retrieved', record.id);
        //     return record.EmailAddress;
        base('Students').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                console.log('Retrieved', record.fields);
                studentsList.push(record.get('EmailAddress'));
            });
            
            console.log("this is studentsList in getStudents " + studentsList);
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        //this.setState({studentsInfo: studentsList});
    }

    checkDups(){
        //this.getStudents();
        //this.setState({studentsInfo: studentsList});
        console.log("I'm in CheckDups! The email you've typed is " + this.state.email)
        console.log("This is student info: " + this.state.studentsInfo);
        this.state.studentsInfo.forEach((studentInfo) => 
        {
            if (studentInfo === this.state.email) {
                console.log("NO it's a DUP!")
            } 
            else{
                console.log("All good")
                }
            
        });
    }
    
        

    // buildSessions(session) {
    //     console.log("inside of session list generator");
    //     return (<option value={session}>{session}</option>);
    // }

    render() {
        console.log("inside of render");
        let typedEmail = ""
        //console.log(this.state.sessions);
       // let displaySessions = [];
        //displaySessions = this.state.sessions.map(this.buildSessions);
        return (
        <form>
        {/* <label> Name:
        <input  type="text"
                value={ this.state.name }
                onChange={ e => this.setState({ name : e.target.value }) }/>
        </label> */}

        <label> Email:
        <input  type="text"
            value={this.state.email}
            onChange={ e => this.setState({ email : e.target.value }) }
           />
        </label>
        <input type="button" onClick={() => {this.checkDups()}} value="Check Email" />
        </form>

            //// Get the input field
            // var input = document.getElementById("myInput");

            // // Execute a function when the user releases a key on the keyboard
            // input.addEventListener("keyup", function(event) {
            //   // Number 13 is the "Enter" key on the keyboard
            //   if (event.keyCode === 13) {
            //     // Cancel the default action, if needed
            //     event.preventDefault();
            //     // Trigger the button element with a click
            //     document.getElementById("myBtn").click();
            //   }
            // });
            
            // <React.Fragment>
            //     {displaySessions}
            // </React.Fragment>
        );
    }

}

export default Forms;