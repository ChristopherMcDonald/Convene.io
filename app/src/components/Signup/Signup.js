import React, { Component } from 'react';
import './Signup.css';
import NavBar from '../NavBar/NavBar';
import SignupDetails from '../SignupDetails/SignupDetails';

class Signup extends Component {

    render() {
        var links = [{text: "Help", path:"/signup/#help"}, {text: "Home", path:"/"}];
        return (
            <div className='Signup'>
                <NavBar links={links}/>
                <SignupDetails />
            </div>
        );
    }
};
export default Signup;
