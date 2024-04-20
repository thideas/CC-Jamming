const Track = () => {


    return (
        <div className="py-2 border-b-[1px] border-[rgba(255,255,255,0.5)] flex text-white">
            <div className="w-full">
                <div className="w-full">SongName</div>
                <div className="text-sm text-gray-300">Song Artist</div>
            </div>
            <button className="text-center text-2xl px-2">+</button>
        </div>
    )

}

export default Track;