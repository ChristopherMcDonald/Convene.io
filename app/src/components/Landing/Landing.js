import React, { Component } from 'react';


import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import Features from '../Features/Features';
import About from '../About/About';
import Contact from '../Contact/Contact';
import './Landing.css';

import scrollToComponent from 'react-scroll-to-component';
import ReactDOM from 'react-dom';

class Landing extends Component {
    constructor(props) {
        super(props);

        this.props.history.listen((location, action) => {
            var scrollTo = this.props.location.hash;
            scrollTo = scrollTo.substring(1, scrollTo.length);
            if(this[scrollTo]) {
                scrollToComponent(this[scrollTo], { align: 'top'});
            }
        });
    }

    render() {
        return (
            <div className="Landing">
                <NavBar links={[{text: "Contact", path:"/#contact"}, {text: "About", path:"/#about"}, {text: "Features", path:"/#features"}]} />
                <Login />
                <Features ref={(section) => { this.features = section; }}/>
                <About ref={(section) => { this.about = section; }} />
                <Contact ref={(section) => { this.contact = section; }} />
            </div>
        );
    }
}

export default Landing;
