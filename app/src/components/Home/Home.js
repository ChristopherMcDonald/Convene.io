import React, { Component } from 'react';
import Meetings from '../Meetings/Meetings';
import Team from '../Team/Team';
import Settings from '../Settings/Settings';
import Feedback from '../Feedback/Feedback';
import Dashboard from '../Dashboard/Dashboard';
import axios from '../../rest/axios';
import './Home.css';

import { Switch, Route } from 'react-router-dom';

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
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li className="sidebar-brand">
                                <a href='/home'><h1>Convene.io</h1></a>
                            </li>
                            <li>
                                <a href="/home/team">Team</a>
                            </li>
                            <li>
                                <a href="/home/meetings">Meetings</a>
                            </li>
                            <li>
                                <a href="/home/settings">Settings</a>
                            </li>
                            <li>
                                <a href="/home/feedback">Feedback</a>
                            </li>
                            <li>
                                <button className='btn btn-danger pull-down' onClick={this.signOut}>Sign Out</button>
                            </li>
                        </ul>
                    </div>

                    <div id="page-content-wrapper">
                        <Switch>
                            <Route path='/home/meetings' render={props => <Meetings user={this.state.user} />}/>
                            <Route path='/home/team' render={props => <Team user={this.state.user} />}/>
                            <Route path='/home/settings' render={props => <Settings user={this.state.user} />}/>
                            <Route path='/home/feedback' render={props => <Feedback user={this.state.user} />}/>
                            <Route path='/home' render={props => <Dashboard user={this.state.user}/>}/>
                        </Switch>
                    </div>
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
