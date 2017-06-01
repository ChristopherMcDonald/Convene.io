import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <NavBar />
   {/*  <Login />
        <LandingDetails /> */}
      </div>
    );
  }
}

export default Landing;
