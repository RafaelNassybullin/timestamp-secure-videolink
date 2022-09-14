import { put, call, takeLatest, CallEffect, PutEffect } from "redux-saga/effects";
import { getExpiredLink, getAllData, clearExpiredLinks } from "api"
import {
  getDataSuccess,
  getDataError,
  getDataByIdSuccess,
  getDataByIdError
} from "store";
import { IData } from "interfaces"

function* getAllDataWorker(): Generator<PutEffect | CallEffect, void, IData[]> {
  try {
    const responce: IData[] = yield call(getAllData);
    yield call(clearExpiredLinks);
    yield put(getDataSuccess(responce));
  } catch (error) {
    yield put(getDataError());
  }
}

function* getByIdWorker({ payload }: {
  type: string,
  payload: string
}): Generator<PutEffect | CallEffect, void, string> {
  const id = payload
  try {
    const responce: string = yield call(getExpiredLink, id);
    yield put(getDataByIdSuccess(responce));
  } catch (error) {
    yield put(getDataByIdError());
  }
}


export function* getAllDataWatcher() {
  yield takeLatest("global/getDataStart", getAllDataWorker);
}
export function* getByIdWatcher() {
  yield takeLatest("global/getDataByIdStart", getByIdWorker);
}

