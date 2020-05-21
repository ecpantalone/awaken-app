import React from 'react';
import './App.js';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';

let mailchimpMembers = [];

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
                let tempMailchimpData = {id: this.props.members[index].id, email: this.props.members[index].email_address, tags: this.props.members[index].tags}
                mailchimpMembers.push(tempMailchimpData);
            }
        }

    }

    compareStudentsOnList() {
        // for each session
        if(this.props.students && mailchimpMembers) {
            (this.props.students).forEach(session => {
                
            });
        }
        // check if students on airtable are on mailchimp list
        // check if students on mailchimp list have proper session tag
        
    }

    buildStudentsToAdd(lists) {
        let allLists = [];
        if (lists) {
            lists.forEach(list => {
                allLists.push(<p>Name of List: {list} </p>);
                allLists.push(<button onClick={() => this.createNewStudent(list)}> Add List </button>);
            });
            return (allLists)
        } else {
            return (<h1>Lists Up to Date</h1>)
        }
    }    

    createNewStudent () {
        console.log("clicked!")
    }

    componentDidUpdate() {
        this.getMailchimpMembers();
    }
    
    render() {
        let displayLists = []
        displayLists = this.state.studentsToAdd.map(this.buildStudentsToAdd);

        return (
            <div>
                hi
            </div>
        );

    }
}
export default StudentCheck;