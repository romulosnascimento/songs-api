import dotenv from 'dotenv';
import axios from 'axios'

dotenv.config();

const musixmatchEndpoint = 'https://api.musixmatch.com/ws/1.1';

const getTrack = isrc => {
    return axios.get(`${musixmatchEndpoint}/track.get?track_isrc=${isrc}&apikey=${process.env.MUSIXMATCH_KEY}`);
}

const Musixmatch = {
    lyrics: isrc => {
        return new Promise((resolve, reject) => {
            getTrack(isrc).then(response => {
                const song = response.data.message.body.track;
                if (song.has_lyrics) {
                    axios.get(`${musixmatchEndpoint}/track.lyrics.get?track_id=${song.track_id}&apikey=${process.env.MUSIXMATCH_KEY}`)
                        .then(response => resolve(response.data.message.body))
                        .catch(error => reject(error));
                } else {
                    reject({ message: 'Song has no lyrics.' });
                }
            });    
        }); 
    }
}

export default Musixmatch;
