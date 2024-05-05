import { useState } from "react";


const Header = ({ accessToken, userProfile, logOut }) => {

    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive((prev) => !prev)
    }



    return (

        <div className="rounded bg-black w-full h-16 py-4 opacity-70 relative">
            <h1 className="text-neutral-50 text-xl text-center">Jamming App</h1>
            {accessToken &&
                <>
                    <img className="rounded-full w-12 h-12 absolute right-2 top-2 cursor-pointer" src={userProfile?.images[0].url} onClick={toggleMenu}></img>
                    <button className={`py-1 pr-3  text-white absolute right-2  top-16 bg-[rgb(0,0,0,0.7)] flex items-center rounded ${!isMenuActive && "hidden"} `} onClick={logOut}>

                        <svg class="h-4 w-4 text-white mx-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg>
                        Log out
                    </button>

                </>

            }

        </div>


    )
}

export default Header;