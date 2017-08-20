import React, { Component } from 'react';
import axios from '../../rest/axios';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
          }
    }

    componentWillMount() {
        var self = this;
        axios.get('user')
            .then((response) => {
                if(response.status === 401) {
                    window.location = "/";
                } else {
                    localStorage.setItem("JWT", response.headers.authorization);
                    self.setState({ user: response.data.user});
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        // only show something if user is logged in successfully
        if(this.state.user.alias) {
            return (
                <div className='Home'>
                    <h1>Welcome {this.state.user.alias}</h1>
                    <button className='btn btn-danger' onClick={this.signOut}>Sign Out</button>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    signOut() {
        localStorage.removeItem('JWT');
        window.location = "/";
    }
}

export default Home;
