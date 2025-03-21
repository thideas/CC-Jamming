import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState, useEffect } from "react";
import spotifyLogo from "./img/Spotify_Logo.png";
import { spotify, redirectURI } from "./Utils/Spotify";
import Header from "./Components/Header/Header";

// test

function App() {


  const [searchResult, setSearchResult] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isPlaylistSent, setPlaylistSent] = useState(false)




  const addSongToPlaylist = (song) => {

    if (!playList.includes(song)) {
      setPlayList([...playList, song]);
    }
  }

  const deleteSongFromPlaylist = (song) => {
    const newPlaylist = playList.filter((el) => song.id !== el.id);
    setPlayList(newPlaylist)
  }


  const logOut = () => {
    window.localStorage.removeItem("accessToken");
    setAccessToken(null);
    window.location.href = redirectURI;
  }




  const searchSpotify = async (searchTerm) => {

    const data = await spotify.fetchSearch(searchTerm, accessToken)
    setSearchResult(data.tracks.items)

  }

  const createPlaylist = async (playlistName) => {
    const playlistId = await spotify.createNewPlaylist(playlistName, userProfile.id, accessToken);
    if (await spotify.addTracks(playList, playlistId, accessToken)) {
      setPlaylistSent(true);
      setTimeout(() => { setPlaylistSent(false) }, 2000)
    }

  }




  useEffect(() => {
    const hrefAccessToken = spotify.getAccessTokenFromURL();

    if (hrefAccessToken) {

      const tokenExpiresInSec = spotify.getTokenExpiryFromURL();
      const expiryDate = new Date(new Date().getTime() + tokenExpiresInSec * 1000)
      window.localStorage.setItem("accessToken", JSON.stringify({ token: hrefAccessToken, expiry: expiryDate }))

      setTimeout(() => {
        logOut();
      }, tokenExpiresInSec * 1000);

      (async () => {
        const data = await spotify.fetchProfile(hrefAccessToken);
        setUserProfile(data);
      })();

    }

    const parsedToken = JSON.parse(window.localStorage.getItem("accessToken"))
    const isTokenActive = new Date() < new Date(parsedToken?.expiry);
    isTokenActive && setAccessToken(parsedToken?.token);

    isTokenActive && (async () => {
      const data = await spotify.fetchProfile(parsedToken?.token);
      setUserProfile(data);
    })();







  }, [])








  return (
    <div className="p-1 pb-3.5 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('./img/background.webp')] h-screen w-screen bg-cover bg-center overflow-scroll flex flex-col">

      <Header userProfile={userProfile} logOut={logOut} accessToken={accessToken} />

      {
        accessToken ?
          (
            <>
              <SearchBar searchSpotify={searchSpotify} />
              <div className="py-1 flex flex-wrap justify-center items-start">
                <SearchResults songList={searchResult} onAddOrDelete={addSongToPlaylist} />
                <Playlist playList={playList} onAddOrDelete={deleteSongFromPlaylist} onSubmit={createPlaylist} />

              </div> </>)


          :
          <>

            <div className="mx-auto mt-20 py-10 flex flex-col items-center gap-8 bg-[rgba(0,0,0,0.7)] w-96 rounded">
              <img src={spotifyLogo} className="w-40" />
              <p className="text-white text-center p-4">In order to modify your playlists, <br /> login to your Spotify account.</p>
              <a href={spotify.authorizeURL} className="p-3 mt-2 font-semibold text-white rounded-full border-2 border-white bg-transparent hover:bg-green-500 transition duration-400">Login to Spotify</a>
            </div>


          </>


      }

      <p className={`text-2xl text-white absolute text-center w-full top-52 transition ${isPlaylistSent ? "opacity-100" : "opacity-0"}`}>Playlist has been saved</p>

    </div >
  );
}

export default App;
