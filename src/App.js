import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState, useEffect } from "react";



function App() {



  const songList = [
    {
      id: 1,
      songTitle: "Song 1 title",
      artist: ["artist1", "artist2"],
      album: "Album title 1"

    },
    {
      id: 2,
      songTitle: "Song 2 title",
      artist: ["artist1", "artist2"],
      album: "Album title 2"

    },
    {
      id: 3,
      songTitle: "Song 3 title",
      artist: ["Single artist"],
      album: "Album title 3"

    },

  ]

  const playListMock = []

  const [searchResult, setSearchResult] = useState(songList);
  const [playList, setPlayList] = useState(playListMock);
  const [accessToken, setAccessToken] = useState('test');



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
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENTID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    })
      .then(res => res.json())
      .then(res => { setAccessToken(res.access_token) })




  }, [])

  const searchSpotify = async (searchTerm) => {

    const response = await fetch(`https://api.spotify.com/v1/search?q=Jackson&type=track`, { headers: { 'Authorization': `Bearer ${accessToken}` } });
    const data = await response.json();
    console.log(data)

  }


  return (
    <div className="p-1 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('./img/background.webp')] h-screen w-screen bg-cover bg-center overflow-scroll">
      <div className="rounded bg-black w-full h-16 py-4 opacity-70">
        <h1 className="text-neutral-50 text-xl text-center">Jamming App</h1>
      </div>
      <SearchBar searchSpotify={searchSpotify} />
      <div className="py-1 flex flex-wrap justify-center items-start">
        <SearchResults songList={searchResult} onAddOrDelete={addSongToPlaylist} />
        <Playlist playList={playList} onAddOrDelete={deleteSongFromPlaylist} />

      </div>

    </div>
  );
}

export default App;
