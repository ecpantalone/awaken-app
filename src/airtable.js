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

class AirTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sessions: [],
            students: new Map()
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
                // run get students on each session
                self.getStudents(record.get('Session'));
            });
            fetchNextPage();

        }, function done(err) {
            // this passes data in session state to parent (app.js)
            self.props.callbackForSessions(self.state.sessions);
            if (err) { console.error(err); return; }
        });
    }

    getStudents(sessionview) {
        let tempStudentList = [];
        
        const self = this;
        
        base('Students').select({
            view: sessionview // this is the name of the view i.e. "Grid View" for all students "Session X" for a single session
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
                // store temp studnt data in hash table i think?
                let tempStudentData = {FirstName: record.get('FirstName'), LastName: record.get('LastName'), EmailAddress: record.get('EmailAddress')}
                // add each chunk of student data to the student list
                tempStudentList.push(tempStudentData);
            });
            fetchNextPage();

        }, function done(err) {
            let newStudentList = {[sessionview]: tempStudentList}
            self.setState({
                students:[...self.state.students, newStudentList]
            });
            
            // this passes data in student lists state to parent (app.js)
            self.props.callbackForStudents(self.state.students);
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
        // console.log(this.state.sessions);
        // console.log(this.state.students)
        displaySessions = this.state.sessions.map(this.buildSession);

        return (
            <React.Fragment>
                {displaySessions}
            </React.Fragment>
        );

    }

}

export default AirTable;

