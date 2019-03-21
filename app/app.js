import React from 'react';
import ReactDOM from 'react-dom';
import { install } from '@material-ui/styles';
import App from './containers/App';

install();
// eslint-disable-next-line import/no-extraneous-dependencies
require('offline-plugin/runtime').install();

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

renderApp();
