const spotify = {
    redirectURI: 'http://thideas.github.io/CC-Jamming',
    spotifyText: "test spotify",
    searchURL: "https://api.spotify.com/v1/search?q=",
    authorizeURL: `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(process.env.REACT_APP_CLIENTID)}&scope=playlist-modify-private&redirect_uri=${encodeURIComponent('http://thideas.github.io/CC-Jamming')}`,



    getAccessTokenFromURL() {
        return window.location.hash.split("&")[0].split("=")[1];
    },
    getTokenExpiryFromURL() {
        return window.location.hash.split("&")[2].split("=")[1];
    },
    async fetchSearch(searchTerm, accessToken) {
        const response = await fetch(`${this.searchURL}${encodeURIComponent(searchTerm)}&type=track`, { headers: { 'Authorization': `Bearer ${accessToken}` } });
        const data = await response.json();
        return data;
    },

    async fetchProfile(accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me', { headers: { 'Authorization': `Bearer ${accessToken}` } });
        const data = await response.json();
        return data
    },

    async createNewPlaylist(playlistName, userId, accessToken) {
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, { method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}` }, body: JSON.stringify({ "name": playlistName, "Description": "", "public": false }) });
        const data = await response.json();
        return data.id;
    },

    async addTracks(playlist, playlistId, accessToken) {

        const uris = playlist.map((song) => song.uri);
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}` }, body: JSON.stringify({ "uris": uris, "position": 0 }) });
        const data = await response.json();
        return data;

    }


}


export default spotify;