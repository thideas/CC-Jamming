const Track = (props) => {


    return (
        <div className="py-2 border-b-[1px] border-[rgba(255,255,255,0.5)] flex text-white">
            <div className="w-full">
                <div className="w-full">{props.song?.songTitle || "Song Title"}</div>
                <div className="text-sm text-gray-300">{props.song?.artist.join(", ") || "Song Artist"} | {props.song?.album || "Album name"}</div>
            </div>
            <button className="text-center text-2xl px-2" onClick={() => props.addSongToPlayList(props.song)}>{props.sign}</button>
        </div>
    )

}

export default Track;