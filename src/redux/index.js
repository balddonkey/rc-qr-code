
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { CatalogueReducer } from './reducer';

const middlewaries = []
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewaries.push(logger);
}

const reducer = combineReducers({
  catalogue: CatalogueReducer
})

const store = createStore(
  reducer, 
  applyMiddleware(...middlewaries)
);

export {
  store
}