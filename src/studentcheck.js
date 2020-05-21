import React from 'react';
import './App.js';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';

let mailchimpMembers = [];
let notOnMailchimp = [];
let untagged = [];

class StudentCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentsToAdd: [],
            studentsToTag: []
        }
        this.getMailchimpMembers = this.getMailchimpMembers.bind(this);
        this.compareStudentsOnList = this.compareStudentsOnList.bind(this);
        this.buildStudentsToAdd = this.buildStudentsToAdd.bind(this);
        this.buildStudentsToTag = this.buildStudentsToTag.bind(this);
        this.buildAddAllNewStudents = this.buildAddAllNewStudents(this);
        this.addNewStudent = this.addNewStudent.bind(this)
        this.addTagToStudent = this.addTagToStudent.bind(this)
    }

    getMailchimpMembers() {
        if (this.props.members && mailchimpMembers.length === 0) {
            for (let index = 0; index < (this.props.members).length; index++) {
                let tempMailchimpData = { id: this.props.members[index].id, EmailAddress: this.props.members[index].email_address, tags: this.props.members[index].tags }
                mailchimpMembers.push(tempMailchimpData);
            }
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
                            if (member['tags'][0]) {
                                if(member['tags'][0].name === session) {
                                    console.log("member has tag");
                                }
                            }
                            // if the emails match but there is no tag
                            else {
                                console.log("member does not have tag")
                                //console.log(student)
                                student.Session = session;
                                student.id = member['id'];
                                untagged.push(student);
                               console.log(untagged)
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
            this.setState({
                studentsToTag: untagged
            })
        } // end of main if statement
    }

    addTagToStudent (student) {
        console.log("clicked!");
        let session = student['Session'];
        let endpoint = "http://localhost:8080/https://us18.api.mailchimp.com/3.0/lists/5daa72e500/members/" + student['id'] + "/tags"
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(
            {
                "tags":[ {
                    name: session
                } ]
            });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(endpoint, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    buildStudentsToAdd(student) {
        return(<p><span>New Student in {student['Session']}: {student['FirstName']} </span> 
        <span> <button onClick={() => this.addNewStudent(student)}>Add This Student</button></span></p>)
    }   
    
    buildStudentsToTag(student) {
        return(<p><span>New Student in {student['Session']}: {student['FirstName']} </span> 
        <span> <button onClick={() => this.addTagToStudent(student)}>Tag This Student</button></span></p>)
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

    buildAddAllNewStudents() {
        return(<p><h3>There are {notOnMailchimp.length} new student(s) that need to be added!</h3>
        <button onClick={() => this.state.studentsToAdd.map(this.addNewStudent)}>Add All New Students</button></p>)
    }

    componentDidUpdate() {
        this.getMailchimpMembers();
    }
    
    render() {
        let allNewStudents = [];
        allNewStudents = this.state.studentsToAdd.map(this.buildStudentsToAdd);
        let addAllNewStudents = this.buildAddAllNewStudents;
        let allUntaggedStudents = [];
        allUntaggedStudents = this.state.studentsToTag.map(this.buildStudentsToTag);
        
        return (
            <div>
                <div id="untagged">
                <h3>There are {untagged.length} student(s) that need to be tagged with their session!</h3>
                    <p>{allUntaggedStudents}</p>
                </div>
                <div id="new-students">
                    <p>{addAllNewStudents}</p>
                    <p>{allNewStudents}    </p>
                </div>
                
            </div>
        );

    }
}
export default StudentCheck;