import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div className='Dashboard'>
                <h2>Welcome Home, {this.props.user.alias}</h2>
            </div>
        );
    }
}

export default Dashboard;
