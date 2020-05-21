import React from 'react';
import './App.js';
import './App.css';
// import request from 'request';
//import Newstudent from './newstudent.js'

// need to run "npm install airtable" in the console

const AirtableVar = require('airtable');
AirtableVar.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyn1hpKbx5jhKY7i'
});
const base = AirtableVar.base('appfQdjvtsNvuwzHF');

let studentsList = []; // Currently used to store all the student email addresses from airtable.

class Forms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "", // The email the user types in to be checked against the database.
            studentsInfo: [], //new array for student emails when transferred from studentsList
            displayForm: false, // Controls if the new student form is displayed when an email is checked
            confirmedDup: false //displays "this is a duplicate email" only when we have confirmed a dup, not upon page load
        };
        
        this.getStudents = this.getStudents.bind(this);
        this.checkDups = this.checkDups.bind(this);
        this.showForm = this.showForm.bind(this);

    }
    
    //loads student emails into an array upon page load
    componentDidMount() {
        this.getStudents();
        this.setState({studentsInfo: studentsList});
     }


    getStudents(){
        // This code came from the Airtable API docs
        base('Students').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                console.log('Retrieved', record.fields);
                studentsList.push(record.get('EmailAddress'));
            });
            
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    
    //this function is called on clicking Check Email button and looks for emails in the database that match what the user input
    checkDups(){
        let dup = false;
        // Loop to check all emails in studentsInfo
        this.state.studentsInfo.forEach((studentInfo) => 
        {
            if (studentInfo === this.state.email) { 
                dup = true;
                this.setState({confirmedDup: true});
            }             
        });
        if (dup === false) {
            this.setState({displayForm: true}); //set the state to show the New Student form
            this.setState({ email: "" }) //set email string back to blank
        }
        else {
           this.setState({displayForm: false});
        }
    }
    
    //this function is called in the render and will display based on the variables set in checkDups
    showForm(){
        let newstudent = "";
        if (this.state.displayForm === true){
            newstudent = <div><div>Please enter new student in the form below.</div><div>
            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrObi9YDZAtBdTFh?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="835"></iframe>
        <button type="button" onClick={() => window.location.reload(false)}>Refresh</button>
        </div></div>
        }
        if (this.state.displayForm === false && this.state.confirmedDup === true){
            newstudent = <div>This is a duplicate. Please update in Airtable.</div>
        }
        return newstudent;
    }

    render() {
        let showForm = ""
        if (this.props.formId === 1){
            showForm = 
            <div>
            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrVoz4cB6SRNNXlP?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="1085"></iframe>
            </div>
        };
        if (this.props.formId === 2){
            showForm =
            <div>
            <form>
                <label> Email:
                <input  type="text"
                    value={this.state.email}
                    onChange={ e => this.setState({ email : e.target.value }) }
               />
                </label>
                <input type="button" onClick={() => {this.checkDups()}} value="Check Email" />
            </form>
            {this.showForm()}
            </div>
        }
        if (this.props.formId === 3){
            showForm = 
            <div>
            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrl6KxlCARZdJMlE?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="995"></iframe>
            </div>
        };
        return (
        <div>
            {showForm}
        </div>
        );
    }

}
export default Forms;