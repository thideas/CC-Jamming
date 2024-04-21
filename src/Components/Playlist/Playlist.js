import Track from "../Track/Track";


const Playlist = (props) => {

    return (
        <div className="bg-[rgba(0,0,0,0.7)] w-96 rounded min-h-80 px-2 py-1">
            <input className="w-full bg-transparent py-2 text-white text-2xl border-b border-[rgba(255,255,255,0.5)] focus:outline-none" placeholder="New Playlist" />
            {props.playList.map((song) => <Track song={song} key={song.id} onAddOrDelete={props.onAddOrDelete} sign={"-"} />)}

            <button className="block py-1 px-8 my-3 mx-auto bg-green-500 rounded-full text-white">Save playlist</button>

        </div>
    )
}

export default Playlist