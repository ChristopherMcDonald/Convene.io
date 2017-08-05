import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
    render() {
        return (<div className='SignIn'>
                    <div className='well'>
                        <form>
                          <div class="form-group">
                            <label for="formGroupExampleInput">Email Address</label>
                            <input type="text" class="form-control" id="email-address" placeholder="lets@convene.io"></input>                      </div>
                          <div class="form-group">
                            <label for="formGroupExampleInput2">Password</label>
                            <input type="password" class="form-control" id="password"></input> 
                          </div>
                          <button type="submit" class="btn btn-primary">Submit</button>
                          <button type="button" class="btn btn-success">First time? Sign up!</button>
                        </form>
                    </div>
                </div>);
    }
}

export default SignIn;
