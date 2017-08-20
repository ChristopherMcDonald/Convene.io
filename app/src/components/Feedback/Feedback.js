import React, { Component } from 'react';
import './Feedback.css';

class Feedback extends Component {
    render() {
        return (
            <div className='Feedback'>
                <h2> Send us your feedback {this.props.user.alias}!</h2>
            </div>
        );
    }
}

export default Feedback;
