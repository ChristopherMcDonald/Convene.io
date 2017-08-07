import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/home' component={Home}/>
        </Switch>
    </main>
);

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
