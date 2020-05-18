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
            sessions: ["default"]
        }
        this.getSessions = this.getSessions.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.sessionListGenerator = this.sessionListGenerator.bind(this);

    }
    
    componentDidMount() {
        this.getSessions();
        this.getStudents("Session 1");
    }

    getSessions() {
        base('Session').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function (record) {
                // this.setState({
                //     sessions: [ ...this.state.sessions, ...record.get('Session') ]
                //   })
                console.log("inside of get sessions");
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
        });

        
    }

    // this function needs to be called by a selection on the dropdown list in the main app
    getStudents(sessionid) {
        base('Students').select({
            view: sessionid // this is the name of the view i.e. "Grid View" for all students "Session X" for a single session
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                studentsList.push(record.get('EmailAddress'));
                console.log(studentsList);
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    sessionListGenerator(session){
        return (<option value={session}>{session}</option>);
      }

    render() {
        console.log("inside of render")
    
        // sessionsList.map(this.addSession);
        let listOfSessions = [];
        listOfSessions = this.state.sessions.map(this.sessionListGenerator);
        return (
            <form action="/" class="menu box">
            <label for="class">Choose a class that you want to email:</label>
            <select id="class" name="classes">
                {/* these options should be generated based on what we have in Airtable */}
                {  listOfSessions }
            </select>
        </form>
        );
    }

}

export default AirTable;