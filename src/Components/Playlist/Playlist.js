import Track from "../Track/Track";


const Playlist = () => {

    return (
        <div className="bg-[rgba(0,0,0,0.7)] w-96 rounded min-h-80 px-2 py-1 flex flex-col">
            <input className="w-full bg-transparent py-2 text-white text-2xl border-b border-[rgba(255,255,255,0.5)] focus:outline-none" placeholder="New Playlist" />
            <Track />
            <Track />


            <button className="py-1 px-8 my-3 mx-auto bg-green-500 rounded-full text-white">Save playlist</button>

        </div>
    )
}

export default Playlist