import dotenv from 'dotenv';
import axios from 'axios'

dotenv.config();

const spotifySearchEndpoint = 'https://api.spotify.com/v1/search';
const spotifySongsEndpoint = 'https://api.spotify.com/v1/tracks';

const spotifyConfig = {};
spotifyConfig.authorization = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

const Spotify = {
    handleAuthorization: (req, res, next) => {
        if (spotifyConfig.token) {
            next();
        } else {
            const body = 'grant_type=client_credentials';
            const config = {
                headers: {
                    'Authorization': `Basic ${spotifyConfig.authorization}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            axios.post('https://accounts.spotify.com/api/token', body, config)
                .then(response => {
                    spotifyConfig.token = response.data;
                    next();
                })
                .catch(error => res.status(500).send(error));
        }
    },
    search: (query, page = 0, size = 10, type = 'track') => {
        return axios.get(`${spotifySearchEndpoint}?query=${query}&type=${type}&offset=${page}&limit=${size}`, {
            headers: {
                'Authorization': `${spotifyConfig.token.token_type} ${spotifyConfig.token.access_token}`
            }
        });   
    },
    song: id => {
        return axios.get(`${spotifySongsEndpoint}/${id}`, {
            headers: {
                'Authorization': `${spotifyConfig.token.token_type} ${spotifyConfig.token.access_token}`
            }
        });
    }
}

export default Spotify;
