import React, { Component } from 'react';
import './Meetings.css';

class Meetings extends Component {
    render() {
        return (
            <div className='Meetings'>
                <h2>Showing Meetings for {this.props.user.alias}</h2>
            </div>);
    }
}

export default Meetings;
