import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import reduxStorageActions from '../constants/reduxstorage';

export default function configureStore(onComplete) {
    const rootReducer = storage.reducer(reducers);
    const engine = createEngine('Docstash');
    const storeMiddleware = storage.createMiddleware(engine, reduxStorageActions);

    let store = createStore(rootReducer, applyMiddleware(thunk, storeMiddleware));

    const load = storage.createLoader(engine);
    load(store).then(onComplete).catch(() => console.log('Failed to load previous state'));

    return store;
}
