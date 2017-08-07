import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn';

import './Landing.css';

class Landing extends Component {

    render() {
        return (
            <div className="Landing">
                <h1 className='title'>Convene.io</h1>
                <SignIn></SignIn>

                <div className='help' data-toggle="modal" data-target="#help-modal">
                    <p>Help</p><i className="fa fa-comments" aria-hidden="true"></i>
                </div>

                <div id="help-modal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Help | Convene.io</h4>
                            </div>
                            <div className="modal-body">
                                <h1 className='question'>What exactly is Convene.io?</h1>
                                <p className='answer'>Convene.io is an applicaton to make your meetings more productive, enjoyable and effective. We focus on streamlining typical processes so you can get back to contributing interesting ideas and solving problems.</p>

                                <h1 className='question'>How much does this cost?</h1>
                                <p className='answer'>Right now, Convene.io is completely free! Just sign up and start making meetings.</p>

                                <h1 className='question'>I found a bug!</h1>
                                <p className='answer'>That is great, please feel free to make an issue on <a target="_blank" href="https://github.com/ChristopherMcDonald/Convene.io.git" rel="noopener noreferrer">GitHub</a></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
