import { combineReducers } from '@reduxjs/toolkit';
import songReducer from './songs/songSlice';

const rootReducer = combineReducers({
  songs: songReducer,
});

export default rootReducer;
