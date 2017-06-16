import React, { Component } from 'react';
import './Features.css'

class Features extends Component {
   render() {
       return (
           <div className='features'>
                <h2>What Can <b>Convene.io</b> do for you?</h2>
                <div className='col-sm-4 col-xs-6 card'>
                    <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
                    <h3>Schedule Meetings</h3>
                    <p>Some meetings can be set up in less than a minute, and others
                    may take longer. We let you do both from standups to retrospectives.</p>
                </div>
                <div className='col-sm-4 col-xs-6 card'>
                    <i className="fa fa-share-square" aria-hidden="true"></i>
                    <h3>Share Meetings</h3>
                    <p>Two people make a meeting, 50 make a party. Do either by
                    sharing over multiple platforms.</p>
                </div>
                <div className="clearfix visible-xs-block"></div>
                <div className='col-sm-4 col-xs-6 card'>
                    <i className="fa fa-comments-o" aria-hidden="true"></i>
                    <h3>Collaborate on Whiteboards</h3>
                    <p>Real-time collaboration allows ideas to be shared on the spot
                    without needing to raise your hand.</p>
                </div>
                <div className="clearfix visible-sm-block visible-lg-block"></div>
                <div className='col-sm-4 col-xs-6 card'>
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <h3>Anonymous Surveys</h3>
                    <p>Show us how you really feel with anonymous surveys to
                    get a real idea of how the team is feeling.</p>
                </div>
                <div className="clearfix visible-xs-block"></div>
                <div className='col-sm-4 col-xs-6 card'>
                    <i className="fa fa-file-code-o" aria-hidden="true"></i>
                    <h3>Send &amp; Receive Files</h3>
                    <p>Whether it is code, a powerpoint or cat GIFs, we will make sure your
                    important files can be shared with all your teammates.</p>
                </div>
                <div className='col-sm-4 col-xs-6 card'>
                    <i className="fa fa-github" aria-hidden="true"></i>
                    <h3>Powerful Integration</h3>
                    <p> We are always trying to provide integration between Convene.io
                    and your favorite apps like GitHub and JIRA </p>
                </div>
           </div>
        );
   }
}

export default Features;
