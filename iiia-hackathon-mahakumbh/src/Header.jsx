import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div style={{zIndex:"10"}}>
            <nav className="w-full flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-600 py-4 sticky top-0 bg-white z-10 shadow-md">
            <div className="flex items-center ml-4">
                {/* <Link to={"/"} className="text-white bg-red-900 p-2 hover:text-yellow-400 transition duration-300 ease-in-out rounded-full animate-bounce text-lg">Report Incidence</Link> */}
                <Link to={"/"} className="text-white hover:text-red-900 transition duration-300 ease-in-out ml-4 text-lg">Home</Link>
                {/* <Link to={"/about"} className="text-white hover:text-red-900 transition duration-300 ease-in-out ml-4 text-lg">About</Link> */}
            </div>
            <div className="flex items-center mr-4">
                <Link to={"/face"} className="text-white hover:text-red-900 transition duration-300 ease-in-out mr-4 text-lg">
                    Alert System 
                </Link>
                <Link to={"/traffic"} className="text-white hover:text-red-900 transition duration-300 ease-in-out mr-4 text-lg">
                    Traffic Management
                </Link>
                <Link to={"/crowdmanagement"} className="text-white hover:text-red-900 transition duration-300 ease-in-out mr-4 text-lg">
                   Crowd Management
                </Link>
                
                
            </div>
        </nav>
        </div>
        
    );
}
