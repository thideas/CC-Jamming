import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState, useEffect } from "react";
import spotifyLogo from "./img/Spotify_Logo.png";



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

  useEffect(() => {

    setAccessToken(window.location.hash.split("&")[0].split("=")[1])




  }, [])

  const searchSpotify = async (searchTerm) => {

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`, { headers: { 'Authorization': `Bearer ${accessToken}` } });
    const data = await response.json();
    setSearchResult(data.tracks.items)

  }


  return (
    <div className="p-1 pb-3.5 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('./img/background.webp')] h-screen w-screen bg-cover bg-center overflow-scroll">
      <div className="rounded bg-black w-full h-16 py-4 opacity-70">
        <h1 className="text-neutral-50 text-xl text-center">Jamming App</h1>

      </div>

      {accessToken ? "" :

        <>

          <div className="mx-auto py-10 mt-20 flex flex-col items-center gap-10 bg-[rgba(0,0,0,0.7)] w-72 rounded">
            <img src={spotifyLogo} className="w-40" />
            <a href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(process.env.REACT_APP_CLIENTID)}&scope=playlist-modify-public&redirect_uri=${encodeURIComponent('http://localhost:3000/')}`} className="p-3 mt-2 inline-block bg-green-500 font-semibold text-white rounded-full border-2 border-white bg-transparent hover:bg-green-500 transition duration-400">Login to Spotify</a>
          </div>

        </>


      }


      {
        accessToken ?
          (
            <>
              <SearchBar searchSpotify={searchSpotify} />
              <div className="py-1 flex flex-wrap justify-center items-start">
                <SearchResults songList={searchResult} onAddOrDelete={addSongToPlaylist} />
                <Playlist playList={playList} onAddOrDelete={deleteSongFromPlaylist} />

              </div> </>) : ''
      }

    </div >
  );
}

export default App;
