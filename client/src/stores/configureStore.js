import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import rootSaga from './rootSaga';
import { reducer } from './reducers';

const sagaMiddleWare = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);
