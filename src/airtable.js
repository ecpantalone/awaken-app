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

const base = AirtableVar.base('appCqqPJRIUaLQHZB');

let studentList = [];

class AirTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sessions: [],
            students: []
        }
        this.getSessions = this.getSessions.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.buildSession = this.buildSession.bind(this);

    }
    
    getSessions() {
        const self = this;
        base('Session').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
                // add session to session state
                self.setState({
                    sessions: self.state.sessions.concat([record.get('Session')])
                });
            });
            fetchNextPage();

        }, function done(err) {
            // this passes data in session state to parent (app.js)
            self.props.callbackForSessions(self.state.sessions);
            if (err) { console.error(err); return; }
        });
    }

    getStudents() {
        const self = this;
        
        base('Students').select({
            view: "Grid view" 
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
                // store temp studnt data in hash table i think?
                let tempStudentData = {FirstName: record.get('FirstName'), LastName: record.get('LastName'), EmailAddress: record.get('EmailAddress'), Sessions: record.get('ClassName')}
                // add each chunk of student data to the student list
                studentList.push(tempStudentData);
            });
            fetchNextPage();

        }, function done(err) {
            self.setState({
                students: studentList
            });
            
            // this passes data in student lists state to parent (app.js)
            self.props.callbackForStudents(self.state.students);
            if (err) { console.error(err); return; }
        });

    }

    componentDidMount() {
        this.getSessions();
        this.getStudents();
    }

    buildSession(s) {
        return (<option value={s}>{s}</option>);
    }

    render() {
        let displaySessions = [];
        displaySessions = this.state.sessions.map(this.buildSession);

        return (
            <div></div>
        );

    }

}

export default AirTable;

