import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }

    navToSignup() {
        window.location = "/signup";
    }

    render() {
        return (
            <div className='loginWrapper'>
                <div className='login'>
                    <h1 className='loginText'>Let's Make Meetings <span>Work</span></h1>
                    <h2 className='loginSubHeader'>Enable Productivity, Streamline Processes and Foster Creativity.</h2>
                    <div className='col-sm-6 col-sm-offset-3 col-xl-4 col-xl-offset-4 loginForm'>
                        <form>
                            <label htmlFor="email">Email Address</label>
                            <input placeholder="alice@wonderland.com" type="text" className="email form-control" />

                            <label htmlFor="password">Password</label>
                            <input type="password" className="password form-control" />
                            <button className="btn btn-primary" >Submit</button>
                            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#signup-modal" onClick={this.navToSignup}>First Time? Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
