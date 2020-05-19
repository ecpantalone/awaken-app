import React from 'react';
import './App.js';
import './App.css';
import request from 'request';

// need to run "npm install airtable" in the console

const AirtableVar = require('airtable');
AirtableVar.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyn1hpKbx5jhKY7i'
});
const base = AirtableVar.base('appfQdjvtsNvuwzHF');
let sessionsList = [];

class AirTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sessions: ["default"]
        }
        this.getSessions = this.getSessions.bind(this);
        this.addSession = this.addSession.bind(this);
        this.buildSession = this.buildSession.bind(this);

    }
    
    getSessions() {
        let counter = 0;
        base('Session').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
                sessionsList.push(record.get('Session'));
                console.log("inside of records loop in get sessions");
                console.log("the airtable api is returning data type: " + typeof record.get('Session'))
                console.log(sessionsList);
                console.log("sessionsList is data type: " + typeof sessionsList)
                console.log("the item in spot " + counter + " of sessionsList is " + sessionsList[counter])

                counter += 1;
            });
            fetchNextPage();

        }, function done(err) {
            console.log("inside of done in get sessions")
            if (err) { console.error(err); return; }
        });
        console.log("outside of records loop in get sessions")
        console.log(sessionsList);
        console.log("the item in spot " + counter + " of sessionsList is " + sessionsList[counter])
        // this.addSession(sessionsList[0]);
    }

    componentDidMount() {
        console.log("inside of component did mount");
        this.getSessions();
        console.log("after get sessions / bfore add session in component did mount");
        this.addSession(sessionsList[0]);
    }

    addSession(s) {
        console.log("inside of add session")
        console.log("adding " + s + " to this.state.sessions")
        this.setState({ 
            sessions: this.state.sessions.concat([s])
          });
          return "";
    }

    buildSession(s) {
        console.log("inside of build sessions");
        return (<option value={s}>{s}</option>);
    }

    render() {
        console.log("inside of render");

        let displaySessions = [];
        displaySessions = this.state.sessions.map(this.buildSession);

        return (
            <React.Fragment>
                {console.log(this.state.sessions)}
                {console.log(displaySessions)}
                {displaySessions}
            </React.Fragment>
        );

    }

}

export default AirTable;

    // // this function needs to be called by a selection on the dropdown list in the main app
    // getStudents(sessionid) {
    //    let studentsList = [];
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