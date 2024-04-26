const Track = (props) => {


    return (
        <div className="py-2 border-b-[1px] border-[rgba(255,255,255,0.5)] flex text-white">
            <div className="w-full">
                <div className="w-full">{props.song?.name}</div>
                <div className="text-sm text-gray-300">{props.song?.artists.map(({ name }) => name).join(", ")} | {props.song?.album.name}</div>
            </div>
            <button className="text-center text-2xl px-2" onClick={() => props.onAddOrDelete(props.song)}>{props.sign}</button>
        </div>
    )

}

export default Track;