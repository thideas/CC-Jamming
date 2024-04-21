
const SearchBar = (props) => {



    return (
        <div className="py-12 flex flex-col items-center justify-center">
            <input className="w-52 px-2 py-1 rounded-lg" placeholder="Search for songs..." />
            <button className="py-1 px-8 my-3 bg-green-500 rounded-full text-white" onClick={() => { props.searchSpotify() }}>Search</button>

        </div>
    )

}

export default SearchBar;