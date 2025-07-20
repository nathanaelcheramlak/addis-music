import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  setSongs,
  addSongRequest,
  addSongSuccess,
  updateSongRequest,
  updateSongSuccess,
  deleteSongRequest,
  deleteSongSuccess,
} from './songSlice';

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = 'https://addis-music-ff4n.onrender.com';

// Helper function for GET
async function fetchSongsApi() {
  return fetch(`${API_BASE_URL}/songs`).then((res) => res.json());
}

// Helper function for POST
async function addSongApi(song) {
  return fetch(`${API_BASE_URL}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song),
  }).then((res) => res.json());
}

// Helper function for PUT
async function updateSongApi(song) {
  const { id } = song;
  return fetch(`${API_BASE_URL}/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song),
  }).then((res) => res.json());
}

// Helper function for DELETE
async function deleteSongApi(id) {
  const res = await fetch(`${API_BASE_URL}/songs/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete');
  return id;
}

function* fetchSongs() {
  try {
    const data = yield call(fetchSongsApi);
    yield put(setSongs(data));
  } catch (err) {
    console.error('Error fetching songs:', err);
  }
}

function* addSong(action) {
  try {
    const data = yield call(addSongApi, action.payload);
    yield put(addSongSuccess(data));
  } catch (err) {
    console.error('Error adding song:', err);
  }
}

function* updateSong(action) {
  try {
    const data = yield call(updateSongApi, action.payload);
    yield put(updateSongSuccess(data));
  } catch (err) {
    console.error('Error updating song:', err);
  }
}

function* deleteSong(action) {
  try {
    console.log('Deleting song with ID (SongSaga.js):', action.payload);
    const id = yield call(deleteSongApi, action.payload);
    yield put(deleteSongSuccess(id));
  } catch (err) {
    console.error('Error deleting song:', err);
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(addSongRequest.type, addSong);
  yield takeLatest(updateSongRequest.type, updateSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
}
