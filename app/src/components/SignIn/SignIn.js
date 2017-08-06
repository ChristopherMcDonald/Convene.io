import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
    render() {
        return (
            <div className='SignIn'>
                <div className='well'>
                    <form>
                        <div className="form-group">
                            <label className='form-label' for="email-address">Email Address</label>
                            <input type="text" className="form-control" id="email-address" placeholder="lets@convene.io"></input>
                        </div>
                        <div className="form-group">
                            <label className='form-label' for="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Super Secret..."></input>
                        </div>
                        <button type="submit" className="btn btn-primary top-btn">Sign In</button>
                        <button type="button" className="btn btn-success">First time? Sign up!</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;
