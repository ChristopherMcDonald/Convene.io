import React, { Component } from 'react';
import ConveneMessage from '../ConveneMessage/ConveneMessage';
import axios from '../../rest/axios';
import _ from 'lodash';
import './Settings.css';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // deep copy of global user
        this.state = {
            userToSave: JSON.parse(JSON.stringify(this.props.user)),
            isDirty: 'disabled'
        }
    }

    isDirty() {
        return _.isEqual(this.state.userToSave, this.props.user);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });

        var dirty = (this.isDirty()) ? '' : 'disabled';
        this.setState({
            isDirty: dirty
        });
    }

    handleSubmit(event) {
        this.hideMessage();
        event.preventDefault();

        // TODO validate input

        axios.put('/user', this.state.userToSave)
        .then(res => {

        }).catch(err => {

        });
    }

    showMessage(type, message) {
        var self = this;
        self.setState({ conveneMessage: {
            type: type,
            message: message,
            active: 'message-active'
            }
        });
    }

    hideMessage() {
        this.setState({ conveneMessage:
            { active: 'message-inactive'}
        });
    }

    render() {
        return (
            <div className='Settings'>
                <h3>Settings for {this.state.userToSave.alias}</h3>
                <div className='well'>
                    <form>
                        <label htmlFor='firstName'>First Name</label>
                        <input name='firstName' type='text' className='form-control firstName' value={this.state.userToSave.name.first}/>

                        <label htmlFor='lastName'>Last Name</label>
                        <input name='lastName' type='text' className='form-control lastName' value={this.state.userToSave.name.last}/>

                        <label htmlFor='alias'>Alias</label>
                        <input name='alias' type='text' className='form-control alias' value={this.state.userToSave.alias}/>

                        <label htmlFor='password'>Password</label>
                        <input name='password' type='password' className='form-control password' value={this.state.userToSave.password}></input>

                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input name='alias' type='password' className='form-control cpassword' value={this.state.userToSave.cpassword}></input>

                        <button className='btn btn-primary' type='submit' disabled={this.state.isDirty}>Submit Changes</button>
                        <button className='btn btn-danger' type='cancel' disabled={this.state.isDirty}>Cancel Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Settings;
