import React, { Component } from 'react';
import axios from 'axios';
import ConveneMessage from '../ConveneMessage/ConveneMessage';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        var params = this.props.location.search.match(/id=([^&]*)/);
        var id = (params) ? params[1] : '';

        params = this.props.location.search.match(/email=([^&]*)/);
        var email = (params) ? params[1] : '';

        this.state = {
            firstName: '',
            lastName: '',
            alias: '',
            email: email,
            team: id,
            password: '',
            confPassword: '',
            emailWarning: '',
            passwordWarning: '',
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
        var warning;
        switch(name) {
            case 'email':
                if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value)) {
                    this.setState({ emailWarning: ''});
                } else {
                    this.setState({ emailWarning: ' has-error'});
                }
                break;
            case 'password':
                warning = (event.target.value !== this.state.confPassword) ? ' has-error' : '';
                this.setState({passwordWarning: warning});
                break;
            case 'confPassword':
                warning = (this.state.password !== event.target.value) ? ' has-error' : '';
                this.setState({passwordWarning: warning});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        this.hideMessage();
        event.preventDefault();
        var user = {
            name: {
                    first: this.state.firstName,
                    last: this.state.lastName
            },
            password: this.state.password,
            confPassword: this.state.confPassword,
            alias: this.state.alias,
            email: this.state.email,
            team: this.state.team
        };
        if(! /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(user.email)) {
            this.showMessage("danger", "That email doesn't look right, ensure it is spelt correctly.");
            return;
        }

        if(user.password !== user.confPassword) {
            this.showMessage("danger", "Those passwords do not match!");
            return;
        }

        var message = "Please ensure all fields are filled out correctly. [";
        var show = false;
        if(user.name.first === '') {
            message += "First Name is missing, ";
            show = true;
        }
        if(user.name.last === '') {
            message += "Last Name is missing, ";
            show = true;
        }
        if(user.alias.length < 3) {
            message += "Alias is too short, ";
            show = true;
        }
        if(user.email === '') {
            message += "Email is empty, ";
            show = true;
        }
        if(user.team === '') {
            message += "Team is missing, ";
            show = true;
        }
        if(! /^(?=.*\d).{6,}$/.test(user.password)) {
            message += "Password must be longer than 6 characters and have one number, ";
            show = true;
        }

        if(show) {
            this.showMessage('danger', message.substr(0, message.length - 2) + "]");
            return;
        }

        var self = this;
        axios.post('http://localhost:4000/user', user, { validateStatus: (status) => { return status < 500; }})
        .then((response) => {
            console.log(response);
            if(response.data.id) {
                window.location = '/';
            } else if(response.status === 422) {
                self.showMessage('danger', response.data);
            }
        }).catch((error) => {
            console.log(error);
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
            <div className='SignUp'>
                <h1 className='title'>Welcome to Convene.io!</h1>
                <div className='well'>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className='form-label' htmlFor="first-name">First Name</label>
                            <input name="firstName" value={this.state.firstName} onChange={this.handleChange} type="text" className="form-control" id="first-name" placeholder="Mike"></input>
                        </div>
                        <div className="form-group">
                            <label className='form-label' htmlFor="last-name">Last Name</label>
                            <input name="lastName" value={this.state.lastName} onChange={this.handleChange} type="text" className="form-control" id="last-name" placeholder="Ross"></input>
                        </div>
                        <div className="form-group">
                            <label className='form-label' htmlFor="alias">Username/Alias</label>
                            <input name="alias"  value={this.state.alias} onChange={this.handleChange} type="text" className="form-control" id="alias" placeholder="This is what other users will see you as..."></input>
                        </div>
                        <div className="form-group">
                            <label className='form-label' htmlFor="team">Team ID</label><br></br>
                            <label className='form-label grey' htmlFor="team">Must already exist, see system administrator or manager for the ID or signup link</label>
                            <input name="team" value={this.state.team} onChange={this.handleChange} type="text" className='form-control' id="team" placeholder="Convene..."></input>
                        </div>
                        <div className={'form-group' + this.state.emailWarning}>
                            <label className='form-label' htmlFor="email-address">Email Address</label>
                            <input name="email"  value={this.state.email} onChange={this.handleChange} type="text" className="form-control" id="email-address" placeholder="lets@convene.io"></input>
                        </div>
                        <div className={'form-group' + this.state.passwordWarning}>
                            <label className='form-label' htmlFor="password">Password</label>
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" className="form-control" id="password" placeholder="Super Secret..."></input>
                        </div>
                        <div className={'form-group' + this.state.passwordWarning}>
                            <label className='form-label' htmlFor="conf-password">Password</label>
                            <input name="confPassword" value={this.state.confPassword} onChange={this.handleChange} type="password" className="form-control" id="conf-password" placeholder="Super Secret..."></input>
                        </div>
                        <button type="submit" className="btn btn-success top-btn">Sign Up!</button>
                    </form>
                </div>
                <ConveneMessage type={this.state.conveneMessage.type} message={this.state.conveneMessage.message} active={this.state.conveneMessage.active}></ConveneMessage>
            </div>
        );
    }
}

export default SignUp;
