import React from 'react';
import './App.js';
import './App.css';

let mailchimpSegments = [];
let mailchimpMembers = [];
let notMailchimpMember = [];
let untagged = [];

class UpdateMailchimp extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }

        this.getSegments = this.getSegments.bind(this);
        this.getMembers = this.getMembers.bind(this);
        this.compareSessionsandSegments = this.compareSessionsandSegments.bind(this);
        this.compareMembersAndStudents = this.compareMembersAndStudents.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this);
        this.addTagToStudent = this.addTagToStudent.bind(this);

    }

    componentDidUpdate () {
        this.getSegments();
        this.getMembers();
    }

    // store segment names in variable for ease of access
    getSegments () {
        if (this.props.segments && mailchimpSegments.length === 0) {
            for (let index = 0; index < (this.props.segments).length; index++) {
                mailchimpSegments.push(this.props.segments[index].name);
            }
            this.compareSessionsandSegments();
        }
    }

    // store current mailchimp member data in a variable for ease of access
    getMembers() {
        if (this.props.members && mailchimpMembers.length === 0) {
            for (let index = 0; index < (this.props.members).length; index++) {
                let tempMailchimpData = { id: this.props.members[index].id, EmailAddress: this.props.members[index].email_address, tags: this.props.members[index].tags }
                mailchimpMembers.push(tempMailchimpData);
            }
            this.compareMembersAndStudents()
        }

    }

    // compare session names and segment names
    compareSessionsandSegments() {
        let notOnMailchimp = [];
        if (this.props.sessions && mailchimpSegments && this.props.students) {
            for (let index = 0; index < (this.props.sessions).length; index++) {
                if (!mailchimpSegments.includes(this.props.sessions[index])) {
                    notOnMailchimp.push(this.props.sessions[index])
                }
            }
            if (notOnMailchimp) {
                notOnMailchimp.forEach(newSession => {
                    console.log(newSession)
                    if (this.props.students[newSession]) {
                        console.log("there are students")
                        this.props.students[newSession].forEach(student => {
                            this.addNewStudent(student);
                        });
                    }

                });
            }
        }
    }

    // compare members on mailchimp with students on airtable
    compareMembersAndStudents() {
        // if everything has loaded
        if (this.props.students && mailchimpMembers) {
            // for every session group in students
            for (let session in this.props.students) {
                // for each student in that session
                this.props.students[session].forEach(student => {
                    let emailOnList = false; // flag to be switched if email match is found
                    // for each email list on mailchimp
                    mailchimpMembers.forEach(member => {
                        // if there is an email address on mailchimp that matches the email address on airtable
                        if (member['EmailAddress'] === student['EmailAddress']) {
                            emailOnList = true; // match found, flag switched
                            // if the emails match and the email address on mailchimp has a tag with the session
                            if (member['tags']) {
                                let hasTags = false; // flag to be switched if tag match found
                                for (let index = 0; index < member['tags'].length; index++) {
                                    if (member['tags'][index].name === session) {
                                        hasTags = true; // tag found, flag switched
                                     }
                                }
                                // if a matching tag is not found
                                if(!hasTags){
                                    student.Session = session;
                                    student.id = member['id'];
                                    untagged.push(student);
                                }
                        }
                        }
                    });
                    // if the student is not a member on mailchimp
                    if (!emailOnList) {
                        //TODO: why are boop@gmail.com and snow@gmail.com appearing here?
                        student.Session = session;
                        notMailchimpMember.push(student);
                    }
                });
            }
            // if there are students in airtable that are not members on mailchimp
            if(notMailchimpMember) {
                notMailchimpMember.forEach(newMember => {
                     this.addNewStudent(newMember);
                });
            }
            // if a student is tagged in a session on airtable but not on mailchimp
            if(untagged){
                console.log(untagged)
                untagged.forEach(newTag => {
                    this.addTagToStudent(newTag);
                });
            }
        } 
    }

    // POST to mailchimp for a new student
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

    //POST to mailchimp to add a tag to a student
    addTagToStudent (student) {
        console.log("clicked!");
        let session = student['Session'];
        let email = student['EmailAddress']
        let segment;

        for (let index = 0; index < this.props.segments.length; index++) {
            if(this.props.segments[index].name === session) {
                segment = this.props.segments[index].id
            }
            
        }
        console.log(segment)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(
            {
                "email_address": email
            });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/https://us18.api.mailchimp.com/3.0/lists/5daa72e500/segments/" + segment + "/members", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render() {
        return(
            <div>

            </div>
        )
    }

}

export default UpdateMailchimp