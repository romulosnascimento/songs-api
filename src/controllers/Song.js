import axios from 'axios';

const spotifySearchEndpoint = 'https://api.spotify.com/v1/search';
const spotifySongsEndpoint = 'https://api.spotify.com/v1/tracks';
const musixmatchSongsEndpoint = 'https://api.musixmatch.com/ws/1.1/track.get';

const getMusixmatchSongId = isrc => {
    
};

const Song = {
    search: (req, res) => {
        const searchQuery = req.query.q;
        const page = req.query.page || 0;
        const size = req.query.size || 10;
        axios.get(`${spotifySearchEndpoint}?query=${searchQuery}&type=track&offset=${page}&limit=${size}`, {
            headers: {
                'Authorization': `${req.spotifyToken.token_type} ${req.spotifyToken.access_token}`
            }
        }).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    get: (req, res) => {
        const id = req.params.id;
        axios.get(`${spotifySongsEndpoint}/${id}`, {
            headers: {
                'Authorization': `${req.spotifyToken.token_type} ${req.spotifyToken.access_token}`
            }
        }).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    lyric: (req, res) => {
        const id = req.params.id;
        axios.get(`${spotifySongsEndpoint}/${id}`, {
            headers: {
                'Authorization': `${req.spotifyToken.token_type} ${req.spotifyToken.access_token}`
            }
        }).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            res.status(500).send(error);
        });
    }
};

export default Song;