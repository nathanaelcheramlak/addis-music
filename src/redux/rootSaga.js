import { all } from 'redux-saga/effects';
import songSaga from './songs/songSaga';

export default function* rootSaga() {
  yield all([songSaga()]);
}
