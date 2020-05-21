import React from 'react';
import './App.js';
import './App.css';
import request from 'request';
import Forms from './forms.js';



class Formmenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formId: 0
        };
    }




    render() {
        return (
        <div>
            <button onClick={() => this.setState({formId: 1})}>Add Session</button>
            <button onClick={() => this.setState({formId: 2})}>Add Student</button>
            <button onClick={() => this.setState({formId: 3})}>Add Teacher</button>
            <Forms formId={this.state.formId}/>
        </div>
        );
    }

}
export default Formmenu;