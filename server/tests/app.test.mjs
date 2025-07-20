import request from 'supertest';
import fs from 'fs';
import app from '../app.js';

const dataPath = 'songs.json';

// beforeEach(() => {
//   fs.writeFileSync(dataPath, '[]');
// });

describe('Songs API', () => {
  it('GET /songs should return empty array', async () => {
    const res = await request(app).get('/songs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /songs should add a new song', async () => {
    const song = { title: 'Test Song', artist: 'Test Artist' };
    const res = await request(app).post('/songs').send(song);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(song.title);
    expect(res.body.artist).toBe(song.artist);
  });

  it('PUT /songs/:id should update a song', async () => {
    const song = { title: 'Initial', artist: 'Initial' };
    const postRes = await request(app).post('/songs').send(song);
    const id = postRes.body.id;

    const updated = { title: 'Updated Title' };
    const res = await request(app).put(`/songs/${id}`).send(updated);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(updated.title);
  });

  it('DELETE /songs/:id should delete a song', async () => {
    const song = { title: 'ToDelete', artist: 'Someone' };
    const postRes = await request(app).post('/songs').send(song);
    const id = postRes.body.id;

    const delRes = await request(app).delete(`/songs/${id}`);
    expect(delRes.statusCode).toBe(204);

    const getRes = await request(app).get('/songs');
    expect(getRes.body.length).toBe(0);
  });

  it('POST /songs should return 400 if title or artist is missing', async () => {
    const res = await request(app)
      .post('/songs')
      .send({ title: 'Missing Artist' });
    expect(res.statusCode).toBe(400);
  });
});
