import Track from "../Track/Track";

const SearchResults = (props) => {


    return (
        <div className="bg-[rgba(0,0,0,0.7)] w-96 rounded min-h-80 px-2 py-1">
            <h1 className="text-white text-2xl font-bold">Results</h1>
            <Track />
            <Track />

        </div>
    )

}

export default SearchResults;