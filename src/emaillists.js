import React from 'react';
import './App.js';
import './App.css';
import AirTable from './airtable';
import MailChimp from './mailchimp';

class EmailLists extends React.Component {
    constructor(props){
        super(props);

        this.compareLists = this.compareLists.bind(this);
        this.compareStudentsOnList = this.compareStudentsOnList.bind(this);
        this.addList = this.addList.bind(this);
    }

    compareLists() {
        console.log("inside of compare lists");
        console.log(this.props.sessions);
        console.log(this.props.lists);
        
    }

    compareStudentsOnList () {
        console.log(this.props.students);
    }

    addList() {

    }

    componentDidUpdate() {
        this.compareLists();
    }

    
render() {

    return (
        <React.Fragment>
            <button onclick="addList()"> Add this List</button>
        </React.Fragment>
    );

}
}
export default EmailLists;