import React from 'react';
import ReactDOM from 'react-dom';
import SignupDetails from './SignupDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignupDetails />, div);
});
