import React, { Component } from 'react';
import axios from '../../rest/axios';
import ConveneMessage from '../ConveneMessage/ConveneMessage';
import './SignIn.css';

import '../../lib/bootstrap-3.3.7/css/bootstrap.min.css';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            conveneMessage: {
                type: '',
                message: '',
                active: 'message-inactive'
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var self = this;
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
            // do request
            axios.post('user/login', { email: this.state.email, password: this.state.password})
            .then((response) => {
                if(response.data.res === 'valid') {
                    localStorage.setItem('JWT', response.data.token);
                    window.location = '/home';
                } else {
                    self.showMessage('danger', 'Invalid username or password');
                }
              })
              .catch((error) => {
                self.showMessage('danger', 'Something terrible has happened, please try again later.');
                console.log(error);
              });
        } else {
            self.showMessage('danger', 'That email doesn\'t look valid, please try again.');
        }
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
        setTimeout(() => {
            self.setState({ conveneMessage:
                { active: 'message-inactive'}
            }
        )}, 3000);
    }

    render() {
        return (
            <div className='SignIn'>
                <div className='well'>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className='form-label' htmlFor="email-address">Email Address</label>
                            <input name="email" value={this.state.email} onChange={this.handleChange} type="text" className="form-control" id="email-address" placeholder="lets@convene.io"></input>
                        </div>
                        <div className="form-group">
                            <label className='form-label' htmlFor="password">Password</label>
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" className="form-control" id="password" placeholder="Super Secret..."></input>
                        </div>
                        <button type="submit" className="btn btn-primary top-btn">Sign In</button>
                        <button type="button" className="btn btn-success" onClick={() => this.navTo('/teamSignUp')}>Make A Team</button>
                        <button type="button" className="btn btn-success" onClick={() => this.navTo('/signup')}>Team already made? Sign up!</button>
                    </form>
                </div>
                <ConveneMessage type={this.state.conveneMessage.type} message={this.state.conveneMessage.message} active={this.state.conveneMessage.active}></ConveneMessage>
            </div>
        );
    }
}

export default SignIn;
