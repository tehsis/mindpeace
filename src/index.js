import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './MindPeace';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
