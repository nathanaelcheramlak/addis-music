# Addis Songs App 🎶

A modern React + Redux web app for listing, adding, and updating Ethiopian songs. Built with custom Webpack configuration from scratch.

---

## 🚀 Live Demo

Frontend: [https://addis-music-three.vercel.app](https://addis-music-three.vercel.app)

Backend (API): [https://addis-music-ff4n.onrender.com](https://addis-music-ff4n.onrender.com)

## 🛠 Tech Stack

### Frontend

- **React 18**
- **Redux Toolkit** for state management
- **Redux-Saga** for side effects
- **Emotion** for styling
- **Webpack** (custom config)

### Backend

- **Express.js**
- **Node.js**
- **CORS**
- **JSON data store** (no database, for simplicity)
- **Jest** for testing

---

## 🧠 AI Usage

No AI-generated logic or code has been directly used in the core functionality of the project. All logic and Webpack configuration were written manually for learning purposes. Only AI assistance was used for:

- Code reviews
- Debugging suggestions
- Documentation polishing

---

## ⚙️ Webpack Configuration

This project uses a custom Webpack setup (no CRA):

- `babel-loader`: Transpiles ES6/JSX
- `html-webpack-plugin`: Injects compiled bundles into HTML
- `dotenv-webpack`: Loads environment variables
- `css-loader`, `style-loader`, `mini-css-extract-plugin`: CSS support

To build:

```bash
npm run build
```

To run in development:

```bash
npm start
```

📦 Setup Instructions

1. Clone the repo

```bash
git clone https://github.com/nathanaelcheramlak/addis-music.git
cd addis-music
```

2. Install dependencies

```bash
npm install
```

3. Run locally

```bash
npm start
```

App will be served at http://localhost:3000

4. Build for production

```bash
npm run build
```

Output is stored in the dist/ folder.

5. Setup the server & run (On a new terminal)

```bash
cd server
npm install
npm run dev
```

## 📡 API Documentation

The backend is built with Express.js and manages song data using a local songs.json file for persistent storage.

Base URL: http://localhost:5000

### GET /songs

Fetches all songs from the list.

**Response:**

- **200 OK**: Returns an array of all song objects.
  ```json
  [
    {
      "id": 1721180418887,
      "title": "Monody",
      "artist": "TheFatRat",
      "album": "Monody",
      "year": 2015,
    },
    ...
  ]
  ```

### POST /songs

Adds a new song to the list.

**Request Body:**

```json
    {
      "id": 1721180418887,
      "title": "Monody",
      "artist": "TheFatRat",
      "album": "Monody",
      "year": 2015,
    },
```

**Response:**

- **201 Created**: Returns the newly created song object.
- **400 Bad Request**: If title or artist is missing.

### PUT /songs/:id

Updates a song with the given id.

**Request Params:**

- `id`: The numeric ID of the song.

**Request Body (partial or full):**

```json
{
  "title": "Lights (Remastered)",
  "year": 2020
}
```

**Response:**

- **200 OK**: Returns the updated song.
- **404 Not Found**: If the song with the specified ID doesn't exist.

### DELETE /songs/:id

Deletes the song with the given id.

**Request Params:**

- `id`: The numeric ID of the song.

**Response:**

- **204 No Content**: On successful deletion.
- **404 Not Found**: If the song with the specified ID doesn't exist.

## 🧪 Tests

For the moment test are only written for the backend.

```bash
cd server
npm test
```

## Author

[Nathanael](https://github.com/nathanaelcheramlak) @ 2025
