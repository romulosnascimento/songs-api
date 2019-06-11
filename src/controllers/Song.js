import Spotify from '../services/Spotify';
import Musixmatch from '../services/Musixmatch';

const Song = {
    search: (req, res) => {
        const query = req.query.q;
        const page = req.query.page || 0;
        const size = req.query.size || 10;
        Spotify.search(query, page, size).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    get: (req, res) => {
        Spotify.song(req.params.id).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    lyrics: (req, res) => {
        Spotify.song(req.params.id).then(response => {
            Musixmatch.lyrics(response.data.external_ids.isrc).then(response => {
                res.status(200).send(response);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }
};

export default Song;