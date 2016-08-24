import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,compose(
    applyMiddleware(thunk, reduxImmutableStateInvariant(), logger ),
    window.devToolsExtension && window.devToolsExtension()
  ));
}
