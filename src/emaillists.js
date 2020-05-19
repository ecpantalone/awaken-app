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
        this.addList = this.addList.bind(this);
    }

    getMailchimpListNames() {
        
        if (this.props.segments && mailchimpLists.length === 0) {
            for (let index = 0; index < (this.props.segments).length; index++) {
                mailchimpLists.push(this.props.segments[index].name);
            }
            console.log(mailchimpLists);
            this.compareLists();
            console.log(this.props.students);
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
        console.log(this.props.students);
    }

    buildLists(lists) {
        let allLists = [];
        if (lists) {
            lists.forEach(list => {
                allLists.push(<p>Name of List: {list} </p>);
                allLists.push(<button onClick={() => this.addList(list)}> Add List </button>);
            });
            return (allLists)
        } else {
            return (<h1>Lists Up to Date</h1>)
        }
    }

    addList(list) {
        console.log("clicked!")
        console.log(list);
        // can't make a new list here have to make a new segment of the awaken pittsburgh list
    }

    componentDidUpdate() {
        this.getMailchimpListNames();
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