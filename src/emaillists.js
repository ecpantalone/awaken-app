import React from 'react';
import './App.js';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';

let mailchimpLists = [];

class EmailLists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listsToAdd: []
        }

        this.compareLists = this.compareLists.bind(this);
        this.compareStudentsOnList = this.compareStudentsOnList.bind(this);
        this.buildLists = this.buildLists.bind(this);
        this.createNewSessionList = this.createNewSessionList.bind(this);
    }

    getMailchimpListNames() {
        
        if (this.props.segments && mailchimpLists.length === 0) {
            for (let index = 0; index < (this.props.segments).length; index++) {
                mailchimpLists.push(this.props.segments[index].name);
            }
            console.log(mailchimpLists);
            this.compareLists();
        }
    }

    compareLists() {
        let notOnMailchimp = [];
        if (this.props.sessions && mailchimpLists) {
            for (let index = 0; index < (this.props.sessions).length; index++) {
                if (!mailchimpLists.includes(this.props.sessions[index])) {
                    notOnMailchimp.push(this.props.sessions[index])
                }
            }
            this.setState({
                listsToAdd: this.state.listsToAdd.concat([notOnMailchimp])
            });
        }

    }

    compareStudentsOnList() {
        // if(this.props.students) {
        //     console.log(this.props.students['Session 3']);
        //     console.log(Object.keys(this.props.students))
        // }
        
    }

    buildLists(lists) {
        let allLists = [];
        if (lists) {
            lists.forEach(list => {
                allLists.push(<p>Name of List: {list} </p>);
                allLists.push(<button onClick={() => this.createNewSessionList(list)}> Add List </button>);
            });
            return (allLists)
        } else {
            return (<h1>Lists Up to Date</h1>)
        }
    }

    createNewSessionList(list) {
        const CORS = "http://localhost:8080/";
        const mailchimpAPIKey = "de3be56ee674cb1b6c68d16d40784d34-us18";
        const mailchimpURI = "https://us18.api.mailchimp.com/3.0/";
        console.log("clicked!")
        console.log(this.props.students[list]);
        this.props.students[list].forEach(student => {
            let email = student['EmailAddress']
            let firstName = student['FirstName']
            let lastName = student['LastName']
            console.log(email)
            console.log(firstName)
            console.log(lastName)
        
        // can't make a new list here have to make a new segment of the awaken pittsburgh list
        // let requestOptions = {
        //     method: 'POST',
        //     headers: new Headers ({
        //       "Authorization": `Basic ${new Buffer(`apikey:${mailchimpAPIKey}`).toString('base64')}`
        //     }),
        //     redirect: 'follow',
        //     body:
        //     {
        //       email_address: email,
        //       tags: list,
        //     }
        //   };
      
        //   fetch(CORS + mailchimpURI + "/lists/5daa72e500/members?apikey=" + mailchimpAPIKey, requestOptions)
        //     .then(response => {
        //        console.log(response);
        //       return response.json();
        //     })
        //     .then(jsonData => {
        //       console.log(response);
        //       this.setState({
        //         campaigns: jsonData.campaigns,
        //         campaignSent: true
        //       });
        //     })
        //     .catch(error => console.log('error', error));
        });
    }

    componentDidUpdate() {
        this.getMailchimpListNames();
        this.compareStudentsOnList();
    }


    render() {
        let displayLists = []
        displayLists = this.state.listsToAdd.map(this.buildLists);

        return (
            <React.Fragment>
                {displayLists}
            </React.Fragment>
        );

    }
}
export default EmailLists;