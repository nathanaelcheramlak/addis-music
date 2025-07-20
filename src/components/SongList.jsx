import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  fetchSongsRequest,
  addSongRequest,
  updateSongRequest,
  deleteSongRequest,
} from '../redux/songs/songSlice';

const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  color: white;
  background-color: green;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  border: 1px solid #ddd;
  padding: 0.75rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const SongDetails = styled.div``;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  background-color: blue;
  color: white;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #ef4444;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  color: white;
  cursor: pointer;
`;

const PaginationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 2px solid black;
  border-radius: 0.375rem;
  background-color: #e5e7eb;
  cursor: pointer;

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.9rem;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.list);

  const [form, setForm] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    id: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const totalPages = Math.ceil(songs.length / pageSize);
  const paginatedSongs = songs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };

    if (isEditing) {
      dispatch(updateSongRequest(payload));
    } else {
      dispatch(addSongRequest(payload));
    }

    setForm({ title: '', artist: '', album: '', year: '', id: null });
    setIsEditing(false);
    setCurrentPage(1);
  };

  const handleEdit = (song) => {
    setForm(song);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteSongRequest(id));
  };

  return (
    <Container>
      <Heading>🎵 Song List</Heading>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="artist"
          placeholder="Artist"
          value={form.artist}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="album"
          placeholder="Album"
          value={form.album}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />
        <Button type="submit">{isEditing ? 'Update Song' : 'Add Song'}</Button>
      </Form>

      <List>
        {paginatedSongs.map((song) => (
          <ListItem key={song.id}>
            <SongDetails>
              <strong>{song.title}</strong> by {song.artist}
              {song.album && <div>Album: {song.album}</div>}
              {song.year && <div>Year: {song.year}</div>}
            </SongDetails>
            <Actions>
              <EditButton onClick={() => handleEdit(song)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDelete(song.id)}>
                Delete
              </DeleteButton>
            </Actions>
          </ListItem>
        ))}
      </List>

      {songs.length > pageSize && (
        <PaginationBar>
          <PageButton
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ⬅️ Prev
          </PageButton>

          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>

          <PageButton
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next ➡️
          </PageButton>
        </PaginationBar>
      )}
    </Container>
  );
};

export default SongList;
