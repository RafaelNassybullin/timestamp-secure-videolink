import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import {
  getAllDataWatcher,
  getByIdWatcher,
  dataReducer
} from "store";

function* RootSaga() {
  yield all([
    fork(getAllDataWatcher),
    fork(getByIdWatcher)
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    global: dataReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>

export * from "./reducer"
export * from "./selector"
export * from "./saga"