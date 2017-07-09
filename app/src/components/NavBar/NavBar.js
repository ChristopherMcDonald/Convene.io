import React from 'react';
import "./NavBar.css";
// import  from 'react-scroll-to-component';

class NavBar extends React.Component {
    render() {
        return (
            <div className="NavBar">
                <div className="logo col-sm-6">
                    <h1>Convene.io</h1>
                </div>
                <div className="navRow hidden-xs col-sm-6">
                    <div className="col-sm-4">
                        <p>Features</p>
                    </div>
                    <div className="col-sm-4">
                        <p>About</p>
                    </div>
                    <div className="col-sm-4">
                        <p>Contact</p>
                    </div>
                </div>
            </div>
        );
    }

//    scrollToAbout() {
//        scrollToComponent(this.props.about);
//    }
}

export default NavBar;
