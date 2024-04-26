const spotify = {
    spotifyText: "test spotify",
    searchURL: "https://api.spotify.com/v1/search?q=",
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
    }


}


export default spotify;