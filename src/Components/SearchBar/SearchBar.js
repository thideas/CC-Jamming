import { useState } from "react";


const SearchBar = (props) => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }




    return (
        <div className="py-12 flex flex-col items-center justify-center">
            <input className="w-52 px-2 py-1 rounded-lg focus:outline-none" placeholder="Search for songs..." value={searchTerm} onChange={handleChange} />
            <button className="py-1 px-8 my-3 bg-green-500 rounded-full text-white" onClick={() => { props.searchSpotify() }}>Search</button>

        </div>
    )

}

export default SearchBar;