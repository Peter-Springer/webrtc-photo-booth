import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PhotoBooth from './PhotoBooth';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = () => {
  return (
    <Router>
      <div>
        <Route exact={true} path='/' component={App} />
        <Route exact={true} path='/photoBooth' component={PhotoBooth} />
      </div>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
