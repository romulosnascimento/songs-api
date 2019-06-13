import express from 'express';
import dotenv from 'dotenv';
import swagger from 'swagger-ui-express';

import Spotify from './src/services/Spotify';
import Song from './src/controllers/Song';

import swaggerDoc from './swagger.json';

const app = express();
app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

dotenv.config();

app.get('/api/v1/songs', Spotify.handleAuthorization, Song.search);
app.get('/api/v1/songs/:id', Spotify.handleAuthorization, Song.get);
app.get('/api/v1/songs/:id/lyrics', Spotify.handleAuthorization, Song.lyrics);

app.listen(process.env.PORT, () => {
    console.log('App running on port', process.env.PORT);
});