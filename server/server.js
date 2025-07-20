import app from './app.js';
const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

app.listen(PORT, () => {
  console.log(`Server is running on ${SERVER_URL}:${PORT}`);
});
