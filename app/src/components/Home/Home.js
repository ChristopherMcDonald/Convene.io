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
        axios.get('http://localhost:4000/user')
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
        return (
            <div className='Home'>
                <h1>Welcome {this.state.user.alias}</h1>
            </div>
    );
    }
}

export default Home;
