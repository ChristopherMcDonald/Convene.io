import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing/Landing';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import './styles/font-awesome-4.7.0/css/font-awesome.min.css';
import './styles/bootstrap/css/bootstrap.min.css';

ReactDOM.render(
    <Landing />,
    document.getElementById('root'));
registerServiceWorker();
