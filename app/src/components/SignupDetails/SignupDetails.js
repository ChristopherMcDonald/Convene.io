import React, { Component } from 'react';
import './SignupDetails.css';

class SignupDetails extends Component {
    render() {
        return (
            <div className='SignupDetails'>
                <h1>Let's Get To Know You</h1>
                <form>
                    <label htmlFor="email">Email Address</label>
                    <input placeholder="alice@wonderland.com" type="text" className="email form-control" />

                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" />

                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input type="password" className="form-control" id="password-confirm" />

                    <button className="btn btn-primary" >Submit</button>
                </form>
            </div>
    );
    }
}

export default SignupDetails;
