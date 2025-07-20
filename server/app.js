// app.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = 'songs.json';

const readSongs = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeSongs = (songs) => {
  fs.writeFileSync(dataPath, JSON.stringify(songs, null, 2), 'utf-8');
};

app.get('/songs', (req, res) => {
  const songs = readSongs();
  res.json(songs);
});

app.post('/songs', (req, res) => {
  const { title, artist, album, year, genre, duration, coverUrl } = req.body;
  if (!title || !artist) {
    return res.status(400).json({ error: 'Title and artist are required' });
  }
  const songs = readSongs();
  const newSong = {
    id: Date.now(),
    title,
    artist,
    album,
    year,
    genre,
    duration,
    coverUrl,
  };
  songs.push(newSong);
  writeSongs(songs);
  res.status(201).json(newSong);
});

app.put('/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const { title, artist, album, year, genre, duration, coverUrl } = req.body;
  let songs = readSongs();
  const index = songs.findIndex((s) => s.id === songId);
  if (index === -1) {
    return res.status(404).json({ error: 'Song not found' });
  }

  songs[index] = {
    ...songs[index],
    title: title ?? songs[index].title,
    artist: artist ?? songs[index].artist,
    album: album ?? songs[index].album,
    year: year ?? songs[index].year,
    genre: genre ?? songs[index].genre,
    duration: duration ?? songs[index].duration,
    coverUrl: coverUrl ?? songs[index].coverUrl,
  };

  writeSongs(songs);
  res.json(songs[index]);
});

app.delete('/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  let songs = readSongs();
  const index = songs.findIndex((s) => s.id === songId);
  if (index === -1) {
    return res.status(404).json({ error: 'Song not found' });
  }
  songs.splice(index, 1);
  writeSongs(songs);
  res.status(204).send();
});

export default app;
