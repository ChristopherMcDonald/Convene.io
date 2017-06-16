import React, { Component } from 'react';
import './Login.css'

class Login extends Component {
    render() {
        return (
            <div className='loginWrapper'>
                <div className='login'>
                    <h1 className='loginText'>Let's Make Meetings <span>Work</span></h1>
                    <div className='col-sm-6 col-sm-offset-3 col-xl-4 col-xl-offset-4 loginForm'>
                        <form>
                            <label for="email">Email Address</label>
                            <input placeholder="alice@wonderland.com" type="text" className="email form-control" />

                            <label for="email">Password</label>
                            <input type="password" className="email form-control" />
                            <button className="btn btn-primary" >Submit</button>
                            <button className="btn btn-info">First Time? Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;