import React from 'react';
import "./NavBar.css";

class NavBar extends React.Component {
    render() {
        return (
            <div className="NavBar">
                <div className="logo col-md-4">
                    <i className="fa fa-rocket"> </i>
                </div>
                <div className="navRow col-md-offset-2 col-md-6">
                    <div className="navItem col-md-4"><p>Features</p></div>
                    <div className="navItem col-md-4"><p>About</p></div>
                    <div className="navItem col-md-4"><p>Contact</p></div>
                </div>
            </div>
        );
    }
}

export default NavBar;