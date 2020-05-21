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
        this.compareSessionsandSegments = this.compareSessionsandSegments.bind(this);
        this.addNewSession = this.addNewSession.bind(this);
        this.getMembers = this.getMembers.bind(this);
        this.compareMembersAndStudents = this.compareMembersAndStudents.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this);
        this.addTagToStudent = this.addTagToStudent.bind(this);

    }

    componentDidUpdate () {
        // console.log("DATA LOG START")
        // console.log("sessions", this.props.sessions);
         console.log("students", this.props.students);
        // console.log("lists", this.props.lists)
        // console.log("segments", this.props.segments);
        // console.log("members", this.props.members);
        // console.log("DATA LOG END")
       // this.getSegments();
        this.getMembers();
    }

    // store segment names in variable for ease of access
    getSegments () {
        if (this.props.segments && mailchimpSegments.length === 0) {
            for (let index = 0; index < (this.props.segments).length; index++) {
                mailchimpSegments.push(this.props.segments[index].name);
            }
            console.log(mailchimpSegments)
            this.compareSessionsandSegments();
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
            console.log(notOnMailchimp);
            if(notOnMailchimp) {
                notOnMailchimp.forEach(newSession => {   
                    this.addNewSession(newSession);          
                });
            }
        }
    }

    // if there is a new session add all of the students currently in that session with the proper tag
    addNewSession(newSession) {
        this.props.students[newSession].forEach(student => {

            let email = student['EmailAddress']
            let firstName = student['FirstName']
            let lastName = student['LastName']
            console.log(email)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify(
                {
                    "email_address": email,
                    "tags": [newSession],
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
        );

    }

    // store current mailchimp member data in a variable for ease of access
    getMembers() {
        if (this.props.members && mailchimpMembers.length === 0) {
            for (let index = 0; index < (this.props.members).length; index++) {
                let tempMailchimpData = { id: this.props.members[index].id, EmailAddress: this.props.members[index].email_address, tags: this.props.members[index].tags }
                mailchimpMembers.push(tempMailchimpData);
            }
            console.log(mailchimpMembers)
            this.compareMembersAndStudents()
        }

    }

    // compare members on mailchimp with students on airtable
    compareMembersAndStudents() {
        // for each session
        console.log("inside of students on list")
        // if everything has loaded
        if (this.props.students && mailchimpMembers) {
            // for every session group in students
            for (let session in this.props.students) {
                // for each student in that session
                this.props.students[session].forEach(student => {
                    let emailOnList = false;
                    // console.log(session, student['EmailAddress'])
                    // for each email list on mailchimp
                    mailchimpMembers.forEach(member => {

                        // if there is an email address on mailchimp that matches the email address on airtable
                        if (member['EmailAddress'] === student['EmailAddress']) {
                            emailOnList = true;
                            
                            // if the emails match and the email address on mailchimp has a tag with the session
                            if (member['tags']) {
                                let hasTags = false;
                                for (let index = 0; index < member['tags'].length; index++) {
                                    if (member['tags'][index].name === session) {
                                        hasTags = true;
                                     }
                                }
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
                        // console.log(student);
                        student.Session = session;
                        notMailchimpMember.push(student);
                    }
                });
            }
            if(notMailchimpMember) {
                notMailchimpMember.forEach(newMember => {
                    // console.log(newMember);
                    // this.addNewStudent(newMember);
                });
            }
            if(untagged){
                console.log(untagged)
            }
            console.log("not on list", notMailchimpMember);
            console.log("untagged", untagged);
        } // end of main if statement
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

    render() {
        return(
            <div>

            </div>
        )
    }

}

export default UpdateMailchimp