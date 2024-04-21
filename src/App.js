import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState } from "react";



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

  const addSongToPlaylist = (song) => {
    setPlayList([...playList, song]);
  }

  const deleteSongFromPlaylist = (song) => {

  }



  return (
    <div className="p-1 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('./img/background.webp')] h-screen w-screen bg-cover bg-center overflow-scroll">
      <div className="rounded bg-black w-full h-16 py-4 opacity-70">
        <h1 className="text-neutral-50 text-xl text-center">Jamming App</h1>
      </div>
      <SearchBar />
      <div className="py-1 flex flex-wrap justify-center items-start">
        <SearchResults songList={searchResult} onAddOrDelete={addSongToPlaylist} />
        <Playlist playList={playList} />

      </div>

    </div>
  );
}

export default App;
