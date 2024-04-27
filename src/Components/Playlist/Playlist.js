import Track from "../Track/Track";
import { useState } from "react";


const Playlist = (props) => {

    const [playlistName, setPlaylistname] = useState("");
    const [isNameEmpty, setIsNameEmpty] = useState(false);

    const handleChange = (e) => {
        setPlaylistname(e.target.value)
    }
    const handleSubmit = () => {

        if (playlistName !== '') {
            props.onSubmit(playlistName)
        }

        else {
            setIsNameEmpty(true);
            setTimeout(() => setIsNameEmpty(false), 2000)
        }



    }


    return (
        <div className="bg-[rgba(0,0,0,0.7)] w-96 rounded min-h-80 px-2 py-1">
            <input className={`w-full bg-transparent py-2 text-white text-2xl border-b transition duration-300 ${isNameEmpty ? "border-red-600" : "border-[rgba(255,255,255,0.5)]"} focus:outline-none`} placeholder="New Playlist" value={playlistName} onChange={handleChange} />

            <p className={`text-red-600 text-sm transition duration-300 overflow-hidden ease-in-out ${isNameEmpty ? "max-h-6 opacity-100" : "max-h-0 opacity-0"}`}>Name your playlist</p>
            {props.playList.map((song) => <Track song={song} key={song.id} onAddOrDelete={props.onAddOrDelete} sign={"-"} />)}

            <button className="block py-1 px-8 my-3 mx-auto bg-green-500 rounded-full text-white" onClick={handleSubmit}>Save playlist</button>

        </div >
    )
}

export default Playlist