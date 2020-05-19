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
            sessions: []
        }
        this.getSessions = this.getSessions.bind(this);
        this.buildSession = this.buildSession.bind(this);

    }
    
    getSessions() {
        var self = this;
        base('Session').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
                self.setState({ 
                    sessions: self.state.sessions.concat([record.get('Session')])
                  });
            });
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    componentDidMount() {
        this.getSessions();
    }

    buildSession(s) {
        return (<option value={s}>{s}</option>);
    }

    render() {
        let displaySessions = [];
        displaySessions = this.state.sessions.map(this.buildSession);

        return (
            <React.Fragment>
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