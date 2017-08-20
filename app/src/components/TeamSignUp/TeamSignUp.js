import React, { Component } from 'react';
import axios from '../../rest/axios';
import ConveneMessage from '../ConveneMessage/ConveneMessage';
import './TeamSignUp.css';

class TeamSignUp extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: '',
            name: '',
            emailWarning: '',
            conveneMessage: {
                type: '',
                message: '',
                active: 'message-inactive'
            }
        };
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
        if(name === 'email') {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value)) {
                this.setState({ emailWarning: ''});
            } else {
                this.setState({ emailWarning: ' has-error'});
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.hideMessage();

        if (this.state.emailWarning.includes('has-error')) {
            this.showMessage('danger', 'Please correct the format of your email.');
            return;
        }

        if (this.state.name.length < 3) {
            this.showMessage('danger', 'Team names must be longer than 3 characters.');
            return;
        }

        var team = {
            name: this.state.name,
            email: [this.state.email]
        }

        var self = this;
        axios.post('team', team)
        .then((response) => {
            console.log(response);
            if(response.status === 201) {
                // TODO email out this link instead, good way of confirming their email
                self.navTo('/signup?id=' + response.data.team._id + "&email=" + team.email);
            } else if(response.status === 422) {
                self.showMessage('danger', response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    navTo(link) {
        window.location = link;
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
            <div className='TeamSignUp'>
                <h1 className='title'>Create a Team</h1>
                <div className='well'>
                    <form onSubmit={this.handleSubmit}>
                        <div className={'form-group' + this.state.emailWarning}>
                            <label className='form-label' htmlFor="conf-password">Your Email</label>
                            <input name="email" value={this.state.email} onChange={this.handleChange} type="text" className="form-control" id="email" placeholder="me@convene.io"></input>
                        </div>
                        <div className='form-group'>
                            <label className='form-label' htmlFor="conf-password">Team Name</label>
                            <input name="name" value={this.state.name} onChange={this.handleChange} type="text" className="form-control" id="name" placeholder="Dream Team"></input>
                        </div>
                        <button type="submit" className="btn btn-success top-btn">Create</button>
                    </form>
                </div>
                <ConveneMessage type={this.state.conveneMessage.type} message={this.state.conveneMessage.message} active={this.state.conveneMessage.active}></ConveneMessage>
            </div>);
    }
}

export default TeamSignUp;
