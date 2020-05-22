import React from 'react';
import './App.js';
import './App.css';


let mailchimpMembers = [];
let notMailchimpMember = [];
let untagged = [];

class UpdateMailchimp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.getMembers = this.getMembers.bind(this);
        this.compareMembersAndStudents = this.compareMembersAndStudents.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this);
        this.addTagToStudent = this.addTagToStudent.bind(this);

    }

    componentDidUpdate() {
        this.getMembers();
    }

    // store current mailchimp member data in a variable for ease of access
    getMembers() {
        if (this.props.members && mailchimpMembers.length === 0) {
            for (let index = 0; index < (this.props.members).length; index++) {
                let tempMailchimpData = { EmailAddress: this.props.members[index].email_address, tags: this.props.members[index].tags }
                mailchimpMembers.push(tempMailchimpData);
            }
            this.compareMembersAndStudents()
        }

    }

    // compare members on mailchimp with students on airtable
    compareMembersAndStudents() {
        // if everything has loaded
        if (this.props.students && mailchimpMembers) {
            // for each student on airtable
            for (let index = 0; index < this.props.students.length; index++) {
                let emailOnList = false; // flag to be switched if email match is found
                // for each email on mailchimp
                mailchimpMembers.forEach(member => {
                    // if there is an email address on mailchimp that matches the email address on airtable
                    if (member['EmailAddress'] === this.props.students[index]['EmailAddress']) {
                        emailOnList = true; // match found, flag switched
                        // if the emails match and the email address on mailchimp has at least one tag
                        if (member['tags']) {
                            let hasTags = false; // flag to be switched if tag match found
                            // go through the mailchimp tags
                            member['tags'].forEach(tag => {
                                // if there is a matching tag
                                if (this.props.students[index]['Sessions'].includes(tag.name)) {
                                    hasTags = true;
                                } else {
                                    hasTags = false;
                                }
                            });
                            // if a matching tag is not found
                            if (!hasTags) {
                                // add student to untagged list
                                untagged.push(this.props.students[index]);
                            }
                        }
                    }
                });
                // if the student is not a member on mailchimp
                if (!emailOnList) {
                    // add student to not a mailchimp member list
                    notMailchimpMember.push(this.props.students[index]);
                }

            }
            // if there are students in airtable that are not members on mailchimp
            if (notMailchimpMember) {
                notMailchimpMember.forEach(newMember => {
                    this.addNewStudent(newMember);
                });
            }
            // if a student is tagged in a session on airtable but not on mailchimp
            if (untagged) {
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
        let session = student['Sessions']
        console.log(email)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(
            {
                "email_address": email,
                "tags": session,
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
    addTagToStudent(student) {
        console.log("clicked!");
        let session = student['Session'];
        let email = student['EmailAddress']
        let segment;

        for (let index = 0; index < this.props.segments.length; index++) {
            if (this.props.segments[index].name === session) {
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
        return (
            <div>

            </div>
        )
    }

}

export default UpdateMailchimp