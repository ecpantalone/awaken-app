import React from 'react';
import './App.js';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';

let mailchimpLists = [];
let mailchimpMembers = [];

class EmailLists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionsToAdd: [],
            studentsToAdd: []
        }
        // this.getMailchimpSegments = this.getMailchimpSegments.bind(this);
        // this.getMailchimpMembers = this.getMailchimpMembers.bind(this);
        // this.compareLists = this.compareLists.bind(this);
        // this.compareStudentsOnList = this.compareStudentsOnList.bind(this);
        // this.buildLists = this.buildLists.bind(this);
        // this.createNewSessionList = this.createNewSessionList.bind(this);
        // this.dataLogger = this.dataLogger(this);
    }

//    getMailchimpSegments() { 
//         if (this.props.segments && mailchimpLists.length === 0) {
//             for (let index = 0; index < (this.props.segments).length; index++) {
//                 mailchimpLists.push(this.props.segments[index].name);
//             }
//         }
//     }
    
//     getMailchimpMembers() {
//         if (this.props.members && mailchimpMembers.length === 0) {
//             for (let index = 0; index < (this.props.members).length; index++) {
//                 let tempMailchimpData = {id: this.props.members[index].id, email: this.props.members[index].email_address, tags: this.props.members[index].tags}
//                 mailchimpMembers.push(tempMailchimpData);
//             }
//         }

//     }

//     compareLists() {
//         let notOnMailchimp = [];
//         if (this.props.sessions && mailchimpLists) {
//             for (let index = 0; index < (this.props.sessions).length; index++) {
//                 if (!mailchimpLists.includes(this.props.sessions[index])) {
//                     notOnMailchimp.push(this.props.sessions[index])
//                 }
//             }
//             this.setState({
//                 sessionsToAdd: this.state.sessionsToAdd.concat([notOnMailchimp])
//             });
//         }
//        // this.dataLogger();
//     }

//     compareStudentsOnList() {
//         // for each session
//         if(this.props.students && mailchimpMembers) {
//             (this.props.students).forEach(session => {
                
//             });
//         }
//         // check if students on airtable are on mailchimp list
//         // check if students on mailchimp list have proper session tag
        
//     }

//     buildLists(lists) {
//         let allLists = [];
//         if (lists) {
//             lists.forEach(list => {
//                 allLists.push(<p>Name of List: {list} </p>);
//                 allLists.push(<button onClick={() => this.createNewSessionList(list)}> Add List </button>);
//             });
//             return (allLists)
//         } else {
//             return (<h1>Lists Up to Date</h1>)
//         }
//     }

//     createNewSessionList(list) {
//         console.log("clicked!")
//         console.log(this.props.students[list]);
//         this.props.students[list].forEach(student => {

//             let email = student['EmailAddress']
//             let firstName = student['FirstName']
//             let lastName = student['LastName']
//             console.log(email)
//             var myHeaders = new Headers();
//             myHeaders.append("Authorization", "Basic YXBpa2V5OmRlM2JlNTZlZTY3NGNiMWI2YzY4ZDE2ZDQwNzg0ZDM0LXVzMTg=");
//             myHeaders.append("Content-Type", "application/json");

//             let raw = JSON.stringify(
//                 {
//                     "email_address": email,
//                     "tags": [list],
//                     "status": "subscribed",
//                     merge_fields: {
//                         FNAME: firstName,
//                         LNAME: lastName
//                     }

//                 });

//             let requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: 'follow'
//             };

//             fetch("http://localhost:8080/https://us18.api.mailchimp.com/3.0/lists/5daa72e500/members", requestOptions)
//                 .then(response => response.text())
//                 .then(result => console.log(result))
//                 .catch(error => console.log('error', error));
//         }
//         );
// }      

//     componentDidUpdate() {
//         this.getMailchimpSegments();
//         this.getMailchimpMembers();
//         this.compareStudentsOnList();
        
//     }

//     // this is just for testing
//     dataLogger() {
//         console.log("DATA LOGGER");
//         console.log("-----------------------");
//         console.log("sessions")
//         console.log(this.props.sessions);
//         console.log("students")
//         console.log(this.props.students);
//         console.log("lists")
//         console.log(this.props.lists);
//         console.log("segments")
//         console.log(this.props.segments);
//         console.log("members")
//         console.log(this.props.members);
//         console.log("mailchimp lists")
//         console.log(mailchimpLists)
//         console.log("mailchimp members")
//         console.log(mailchimpMembers);
//         console.log("-----------------------");
//     }


    render() {
        let displayLists = []
        displayLists = this.state.sessionsToAdd.map(this.buildLists);

        return (
            <div>
                <div class="sessions-to-add">
                {displayLists}
                </div>
                <div class="students-to-add">

                </div>
            </div>
        );

    }
}
export default EmailLists;