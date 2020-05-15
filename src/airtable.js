import React from 'react';
import './App.js';
import './App.css';
import request from 'request';

// need to run npm install airtable in the console

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

        }

        this.getSessions = this.getSessions.bind(this);

    }

    getSessions() {
        base('Session').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function (record) {
                sessionsList.push(record.get('Session'));
                console.log(sessionsList);
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
            view: sessionid
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                console.log('Retrieved', record.get('EmailAddress'));
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

}

export default AirTable;

