import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing/Landing';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import './styles/font-awesome-4.7.0/css/font-awesome.min.css';

import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Landing}/>
        </Switch>
    </main>
);

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
