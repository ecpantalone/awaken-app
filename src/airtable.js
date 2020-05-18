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
let studentsList = [];

class AirTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sessions: []
        }
        this.getSessions = this.getSessions.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.buildSession = this.buildSession.bind(this);

    }
    
    getSessions() {
        base('Session').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
                sessionsList.push(record.get('Session'));
                console.log("inside of get sessions");
            });
            fetchNextPage();
            
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        this.setState({sessions: sessionsList}); 
        
    }

    // this function needs to be called by a selection on the dropdown list in the main app
    getStudents(sessionid) {
        base('Students').select({
            view: sessionid // this is the name of the view i.e. "Grid View" for all students "Session X" for a single session
        }).eachPage(function page(records, fetchNextPage) {
        
            records.forEach(function(record) {
                studentsList.push(record.get('EmailAddress'));
            });
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        
    }

    componentDidMount() {
        console.log("inside of component did mount");
        this.getSessions();
         
    }

    buildSession(session) {
        console.log("inside of build sessions");
        return (<option value={session[0]}>{session[0]}</option>);
    }

    render() {
        console.log("inside of render");
        console.log(this.state.sessions);
        let displaySessions = [];
        console.log("right before the map");
        // displaySessions = this.state.sessions.map(this.buildSession);
        console.log(this.state.sessions);
        console.log(displaySessions);
        console.log(sessionsList);
        
    this.state.sessions.forEach(session => {
           console.log("hello");
            displaySessions.push(<option value={session}>{session}</option>);
        });

        return (
            <React.Fragment>
                {displaySessions}
            </React.Fragment>
        );
    }

}

export default AirTable;