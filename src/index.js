import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PhotoBooth from './PhotoBooth';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact={true} path='/' component={App} />
          <Route exact={true} path='/photoBooth' component={PhotoBooth} />
        </div>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
