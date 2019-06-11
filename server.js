import express from 'express';
import dotenv from 'dotenv';

import Spotify from './src/services/Spotify';
import Song from './src/controllers/Song';

const app = express();
app.use(express.json());

dotenv.config();

app.get('/api/v1/songs', Spotify.handleAuthorization, Song.search);
app.get('/api/v1/songs/:id', Spotify.handleAuthorization, Song.get);
app.get('/api/v1/songs/:id/lyrics', Spotify.handleAuthorization, Song.lyrics);

app.listen(process.env.PORT, () => {
    console.log('App running on port', process.env.PORT);
});