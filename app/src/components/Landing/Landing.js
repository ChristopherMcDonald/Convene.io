import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn';

import './Landing.css';

import scrollToComponent from 'react-scroll-to-component';

class Landing extends Component {

    render() {
        return (
            <div className="Landing">
                <h1>Convene.io</h1>
                <SignIn></SignIn>

                <div className='help'>
                    <p>FAQ</p><i class="fa fa-comments" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default Landing;
