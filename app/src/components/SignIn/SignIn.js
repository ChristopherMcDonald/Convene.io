import React, { Component } from 'react';
import axios from 'axios';
import './SignIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
            // do request
            axios.post('http://localhost:4000/users/login', {email: this.state.email, password: this.state.password})
              .then(function (response) {
                console.log(response);
                if(response.data.res === 'valid') {
                    localStorage.setItem('JWT', response.data.token);
                    window.location = '/home';
                } else {
                    // TODO show user error
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
            // TODO show user error
        }
        event.preventDefault();
    }

    navTo(link) {
        window.location = link;
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
                        <button type="button" className="btn btn-success" onClick={() => this.navTo('/signup')}>First time? Sign up!</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;
