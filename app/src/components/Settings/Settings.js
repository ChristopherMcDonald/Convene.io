import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
    render() {
        return (
            <div className='Settings'>
                <h2> Change Settings for {this.props.user.alias}</h2>
            </div>
        );
    }
}

export default Settings;
