import React, { Component } from 'react';
import axios from 'axios';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            alias: '',
            email: '',
            team: '',
            password: '',
            confPassword: '',
            emailWarning: '',
            passwordWarning: '',
        };
    }

    handleChange(event) {
        console.log('change!');
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
        // TODO validate dem fields
        var user = {
            name: {
                    first: this.state.firstName,
                    last: this.state.lastName
            },
            password: this.state.password,
            alias: this.state.alias,
            email: this.state.email,
            team: this.state.team
        };
        axios.post('http://localhost:4000/users/create', user)
        .then(function (response) {
            console.log(response);
            if(response.data.id) {
                window.location = '/';
            } else {
                // TODO show user error
            }
        }).catch(function (error) {
            console.log(error);
        });
        event.preventDefault();
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
                            <label className='form-label' htmlFor="team">Team</label><br></br>
                            <label className='form-label grey' htmlFor="team">Must already exist, see system administrator or manager for exact spelling...</label>
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
            </div>
        );
    }
}

export default SignUp;
