import React, { Component } from 'react';
import './ConveneMessage.css';

class ConveneMessage extends Component {
    // success, info, warning, danger
    render() {
        return (
            <div className={'ConveneMessage ' + this.props.active}>
                <div className={'alert alert-dismissable alert-' + this.props.type} role="alert">
                    <p>{this.props.message}</p>
                </div>
            </div>);
    }
}

export default ConveneMessage;
