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
        this.addNewSegment = this.addNewSegment.bind(this);

    }

    componentDidUpdate() {
        this.getMembers();
        if (this.props.lists) {
            console.log(this.props.lists[0].id)
        }
        console.log(this.props.students)
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
                        // this.props.students[index]['Sessions']
                        // member['tags']
                        let mailchimpTags = [];
                        for (let index = 0; index < member['tags'].length; index++) {
                            mailchimpTags.push(member['tags'][index].name)
                        }
                        if (this.props.students[index]['Sessions']) {
                            this.props.students[index]['Sessions'].forEach(session => {
                                if (!mailchimpTags.includes(session)) {
                                    let tempUntaggedData = { email: this.props.students[index]['EmailAddress'], tag: session }
                                    untagged.push(tempUntaggedData)
                                }

                            });
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

        fetch("http://localhost:8080/https://us18.api.mailchimp.com/3.0/lists/" + this.props.lists[0].id + "/members", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    //POST to mailchimp to add an exisiting tag to a student
    addTagToStudent(student) {
        console.log("clicked!");
        let session = student['tag'];
        let email = student['email']
        let segment;

        for (let index = 0; index < this.props.segments.length; index++) {
            if (this.props.segments[index].name === session) {
                segment = this.props.segments[index].id
            }
        }
        if (segment) {
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

            fetch("http://localhost:8080/https://us18.api.mailchimp.com/3.0/lists/" + this.props.lists[0].id + "/segments/" + segment + "/members", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        } else {
            this.addNewSegment(student);
        }

    }

    //POST to mailchimp to add a new tag to a student
    addNewSegment(student) {
        let session = student['tag'];
        let email = student['email']
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(
            {
                "name": session,
                "static_segment": [email]

            });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/https://us18.api.mailchimp.com/3.0/lists/" + this.props.lists[0].id + "/segments", requestOptions)
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