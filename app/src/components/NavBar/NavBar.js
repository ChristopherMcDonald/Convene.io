import React from 'react';
import "./NavBar.css";

class NavBar extends React.Component {
    render() {
        return (
            <div className="NavBar">
                <div className="logo col-sm-4">
                    <i className="fa fa-2x fa-calendar-check-o"> </i>
                    <p>&nbsp;Convene.io</p>
                </div>
                <div className="navRow hidden-xs col-sm-offset-2 col-sm-6">
                    <div className="navItem col-sm-4">              <span><p>Features</p></span>
                    </div>
                    <div className="navItem col-sm-4">              <span><p>About</p></span>
                    </div>
                    <div className="navItem col-sm-4">              <span><p>Contact</p></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;