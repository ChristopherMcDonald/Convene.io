import React from 'react';
import ReactDOM from 'react-dom';
import ConveneMessage from './ConveneMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConveneMessage type='success' message='Wow! What A Success!' active='message-inactive' />, div);
});
