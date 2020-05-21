import React from 'react';
import './App.js';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';

let mailchimpMembers = [];
let notOnMailchimp = [];
let doneRunning = false;

class StudentCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentsToAdd: []
        }
        this.getMailchimpMembers = this.getMailchimpMembers.bind(this);
        this.compareStudentsOnList = this.compareStudentsOnList.bind(this);
        this.buildStudentsToAdd = this.buildStudentsToAdd.bind(this);
        this.createNewStudent = this.createNewStudent.bind(this)
    }

    getMailchimpMembers() {
        if (this.props.members && mailchimpMembers.length === 0) {
            for (let index = 0; index < (this.props.members).length; index++) {
                let tempMailchimpData = { id: this.props.members[index].id, EmailAddress: this.props.members[index].email_address, tags: this.props.members[index].tags }
                mailchimpMembers.push(tempMailchimpData);
            }
            console.log(mailchimpMembers);
            this.compareStudentsOnList();
        }

    }

    compareStudentsOnList() {
        
        // for each session
        console.log("inside of students on list")
        // if everything has loaded
        if (this.props.students && mailchimpMembers) {
            // for every session group in students
            for (let session in this.props.students) {
                // for each student in that session
                this.props.students[session].forEach(student => {
                    let emailOnList = false;
                    // for each email list on mailchimp
                    mailchimpMembers.forEach(member => {

                        // if there is an email address on mailchimp that matches the email address on airtable
                        if (member['EmailAddress'] === student['EmailAddress']) {
                            emailOnList = true;
                            console.log("email on list");
                            // if the emails match and the email address on mailchimp has a tag with the session
                            if (member['tag'] === session) {
                                console.log("member has tag");
                            }
                            // if the emails match but there is no tag
                            else {
                                console.log("member does not have tag")
                                this.addTagToStudent();
                            }
                        }
                        // if there is not an email address on mc that matches the email address on at

                    });
                    if (!emailOnList) {
                        console.log("student not on list");
                        notOnMailchimp.push(student);
                        console.log(notOnMailchimp)
                    }
                });
            }
        doneRunning = true;
        console.log(doneRunning);
        } // end of main if statement
    }



    addNewStudent(list) {

    }

    addTagToStudent () {

    }

    buildStudentsToAdd(student) {
        return(<p>Add: {student['FirstName']}
        <button>add</button></p>)
    }    

    createNewStudent () {
        console.log("clicked!")
    }

    componentDidUpdate() {
        this.getMailchimpMembers();
    }
    
    render() {
        let displayLists = []

        if (doneRunning) {
            displayLists = notOnMailchimp.map(this.buildStudentsToAdd);
        }
        

        return (
            <div>
                {displayLists}
            </div>
        );

    }
}
export default StudentCheck;