import React, { Component } from 'react';
import './NavBar.css'

/**
* Makes a NavBar with Convene.io on the left, and links on the right
* takes a prop names link which is a list of {text: "...", path: "/..."}
*/
class NavBar extends Component {
    render() {
        var rows = [];
        var cols = this.props.links.length;
        if(cols > 4) {
            throw Error("NavBarGlobal cannot have over 4 links! Consider making a custom component.");
        }
        this.props.links.forEach(function(link) {
            rows.push(
                <div key={link.path} className="col-sm-3 pull-right">
                    <a href={link.path}>
                        <p>{link.text}</p>
                    </a>
                </div>
            );
        });
        return (
            <div className='NavBar'>
                <div className="logo col-sm-6">
                    <h1>Convene.io</h1>
                </div>
                <div className="navRow hidden-xs col-sm-6">
                    {rows}
                </div>
            </div>
        );
    }
}

export default NavBar;
