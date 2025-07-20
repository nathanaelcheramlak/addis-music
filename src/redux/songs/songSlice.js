import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Fetch songs actions
    fetchSongsRequest: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add song actions
    setSongs: (state, action) => {
      state.list = action.payload;
    },
    addSongRequest: (state, action) => {},
    addSongSuccess: (state, action) => {
      state.list.push(action.payload);
    },

    // Update song actions
    updateSongRequest: (state, action) => {},
    updateSongSuccess: (state, action) => {
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id,
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    // Delete song actions
    deleteSongRequest: (state, action) => {},
    deleteSongSuccess: (state, action) => {
      state.list = state.list.filter((song) => song.id !== action.payload);
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  setSongs,
  addSongRequest,
  addSongSuccess,
  updateSongRequest,
  updateSongSuccess,
  deleteSongRequest,
  deleteSongSuccess,
} = songSlice.actions;

export default songSlice.reducer;
