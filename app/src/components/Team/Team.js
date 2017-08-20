import React, { Component } from 'react';
import './Team.css';

class Team extends Component {
    render() {
        return (
            <div className='Team'>
                <h2>Welcome to your team page, {this.props.user.alias}</h2>
            </div>
        );
    }
}

export default Team;
