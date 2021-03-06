import React from 'react';
import './App.js';
import './App.css';
import request from 'request';
import Forms from './forms.js';


class Formmenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formId: 0,
        };
    }


    render() {
        return (
        <div>
            <div className="form-button" onClick={() => this.setState({formId: 1})}>add SESSION</div>
            <div className="form-button" onClick={() => this.setState({formId: 3})}>add TEACHER</div>
            <div className="form-button" onClick={() => this.setState({formId: 2})}>add STUDENT</div>
            <div className="form-button"><a className="at-button" href='https://airtable.com/' target='_blank'>go to AIRTABLE</a></div>
            <Forms formId={this.state.formId} apiKey = {this.props.airtableAPI} baseId = {this.props.airtableBase}/>
        </div>
        );
    }

}
export default Formmenu;