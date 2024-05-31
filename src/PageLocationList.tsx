import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'

const PageLocationList = () => {
    const locationListDATA:string[] = JSON.parse(localStorage?.getItem("locationList") || "[]");

    return (
        <>
            <Navbar />

            <div className='page_locationList'>
                <div className="title">List locations of the Characters</div>
                <div className="lists">
                    {locationListDATA.map((l: string) => (
                        l !== "" ?
                            <Link to={`/character-by-location/${locationListDATA.indexOf(l)}`} className="loc">{l}</Link>
                        : null
                    ))}
                </div>
            </div>
        </>
    )
}

export default PageLocationList