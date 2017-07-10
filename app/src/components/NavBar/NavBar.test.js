import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar links={[{text: "Help", path:"/signup/#help"}, {text: "Home", path:"/"}]} />, div);
});

it('renders with 4 links without crashing', () => {
  const div = document.createElement('div');
  var links = [
      {text: "Help", path:"/signup/#help"},
      {text: "Home", path:"/"},
      {text: "Test", path:"/test"},
      {text: "Test2", path: "/test2"}
  ];
  ReactDOM.render(<NavBar links={links} />, div);
});

it('throws error with 5 links', () => {
  const div = document.createElement('div');
  var links = [
      {text: "Help", path:"/signup/#help"},
      {text: "Home", path:"/"},
      {text: "Test", path:"/test"},
      {text: "Test2", path: "/test2"},
      {text: "Break", path: "/broken"}
  ];

  expect(() => {
      ReactDOM.render(<NavBar links={links} />, div)
  }).toThrow(Error);
});
