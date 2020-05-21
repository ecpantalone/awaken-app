import React from 'react';
import './App.js';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';

let mailchimpMembers = [];
let notOnMailchimp = [];

class StudentCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentsToAdd: []
        }
        this.getMailchimpMembers = this.getMailchimpMembers.bind(this);
        this.compareStudentsOnList = this.compareStudentsOnList.bind(this);
        this.buildStudentsToAdd = this.buildStudentsToAdd.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this)
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
                        student.Session = session;
                        notOnMailchimp.push(student);
                    }
                });
            }
            this.setState({
                studentsToAdd: notOnMailchimp
            })
        } // end of main if statement
    }

    addTagToStudent () {

    }

    buildStudentsToAdd(student) {
        return(<p><span>New Student in {student['Session']}: {student['FirstName']} </span> 
        <span> <a onClick={() => this.addNewStudent(student)}>Add This Student</a></span></p>)
    }    

    addNewStudent(student) {
        console.log("clicked!")
        console.log(student);

        let email = student['EmailAddress']
        let firstName = student['FirstName']
        let lastName = student['LastName']
        let session = student['Session']
        console.log(email)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(
            {
                "email_address": email,
                "tags": [session],
                "status": "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/https://us18.api.mailchimp.com/3.0/lists/5daa72e500/members", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    componentDidUpdate() {
        this.getMailchimpMembers();
    }
    
    render() {
        console.log(this.state.studentsToAdd)
        let displayLists = []
        displayLists = this.state.studentsToAdd.map(this.buildStudentsToAdd);
        
        return (
            <div>
                {displayLists}
            </div>
        );

    }
}
export default StudentCheck;