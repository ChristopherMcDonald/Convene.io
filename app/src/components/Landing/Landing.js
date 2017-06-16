import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import Features from '../Features/Features';
import About from '../About/About';
import Contact from '../Contact/Contact'
import './Landing.css';

class Landing extends Component {
    render() {
        return (
            <div className="Landing">
                <NavBar />
                <Login />
                <Features />
                <About />
                <Contact />
            </div>
        );
    }
}

export default Landing;
