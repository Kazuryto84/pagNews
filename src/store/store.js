import { compose, createStore, applyMiddleware, configureStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { rootReducer } from './root-reducer';

//store.js https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
// https://dev.to/dawnind/persist-redux-state-with-redux-persist-3k0d
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const middleWares =  [logger, thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleWares));

//export const store = createStore(rootReducer, undefined, composedEnhancers);

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);