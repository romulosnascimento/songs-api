import Spotify from '../services/Spotify';
import Musixmatch from '../services/Musixmatch';

const filterSpotifySongData = song => {
    const { id, name, duration_ms, preview_url } = song;
    const album = {
        name: song.album.name,
        release_date: song.album.release_date,
        image_url: song.album.images[0].url
    };
    const artists = song.artists.map(artist => ({
        id: artist.id,
        name: artist.name 
    }));
    const isrc = song.external_ids.isrc;
    return { id, name, duration_ms, preview_url, album, artists, isrc };
};

const Song = {
    search: (req, res) => {
        const query = req.query.q;
        const page = req.query.page || 0;
        const size = req.query.size || 10;
        Spotify.search(query, page, size).then(response => {
            const songs = response.data.tracks.items.map(song => filterSpotifySongData(song));
            res.status(200).send(songs);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    get: (req, res) => {
        Spotify.song(req.params.id).then(response => {
            res.status(200).send(filterSpotifySongData(response.data));
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    lyrics: (req, res) => {
        Spotify.song(req.params.id).then(response => {
            Musixmatch.lyrics(response.data.external_ids.isrc).then(response => {
                res.status(200).send(response.lyrics);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }
};

export default Song;