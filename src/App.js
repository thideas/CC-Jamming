import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState, useEffect } from "react";
import spotifyLogo from "./img/Spotify_Logo.png";
import spotify from "./Utils/Spotify";



function App() {




  const playListMock = []

  const [searchResult, setSearchResult] = useState([]);
  const [playList, setPlayList] = useState(playListMock);
  const [accessToken, setAccessToken] = useState(null);




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
    window.location.href = "http://localhost:3000/";
  }


  useEffect(() => {
    const hrefAccessToken = spotify.getAccessTokenFromURL();

    if (hrefAccessToken) {

      window.localStorage.setItem("accessToken", hrefAccessToken)
      const tokenExpiresIn = spotify.getTokenExpiryFromURL();

      setTimeout(() => {
        logOut();
      }, tokenExpiresIn * 1000);

    }

    setAccessToken(window.localStorage.getItem("accessToken"));






  }, [])

  const searchSpotify = async (searchTerm) => {

    const data = await spotify.fetchSearch(searchTerm, accessToken)
    setSearchResult(data.tracks.items)

  }




  return (
    <div className="p-1 pb-3.5 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('./img/background.webp')] h-screen w-screen bg-cover bg-center overflow-scroll flex flex-col">
      <div className="rounded bg-black w-full h-16 py-4 opacity-70 relative">
        <h1 className="text-neutral-50 text-xl text-center">Jamming App</h1>
        {accessToken &&

          <button className="py-1 pr-3  text-white rounded absolute right-4 top-4 flex items-center" onClick={logOut}>

            <svg class="h-4 w-4 text-white mx-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg>
            Log out
          </button>}

      </div>




      {
        accessToken ?
          (
            <>
              <SearchBar searchSpotify={searchSpotify} />
              <div className="py-1 flex flex-wrap justify-center items-start">
                <SearchResults songList={searchResult} onAddOrDelete={addSongToPlaylist} />
                <Playlist playList={playList} onAddOrDelete={deleteSongFromPlaylist} />

              </div> </>)


          :
          <>

            <div className="mx-auto mt-20 py-10 flex flex-col items-center gap-8 bg-[rgba(0,0,0,0.7)] w-96 rounded">
              <img src={spotifyLogo} className="w-40" />
              <p className="text-white text-center p-4">In order to modify your playlists, <br /> login to your Spotify account.</p>
              <a href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(process.env.REACT_APP_CLIENTID)}&scope=playlist-modify-public&redirect_uri=${encodeURIComponent('http://localhost:3000/')}`} className="p-3 mt-2 font-semibold text-white rounded-full border-2 border-white bg-transparent hover:bg-green-500 transition duration-400">Login to Spotify</a>
            </div>


          </>


      }

    </div >
  );
}

export default App;
