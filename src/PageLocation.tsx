import React, { useContext, useEffect, useState } from 'react'
import LocationIcon from './icons/LocationIcon'
import { Link, useParams } from 'react-router-dom'
import { LocationContext, TContextData } from './context/LocationContext';
import axios from 'axios';
import { ICharacterData } from './PageCharactersList';

const PageLocation = () => {
    const {locationId} = useParams();
    const {locationList, peopleLocationData} = useContext(LocationContext) as TContextData;
    
    const [charactersData, setCharactersData] = useState<ICharacterData[]>([]);

    const getCharacters = async () => {
        let ids = [];
        for (let i = 0; i < peopleLocationData.length; i++) {
            if (peopleLocationData[i] === Number(locationId)) {
                ids.push(i);
            }
        }

        const responses = await Promise.all(ids.map(id => axios.get(`${process.env.REACT_APP_API}/character/${id}`)));
        const fetchedData = responses.map(response => response.data);
        setCharactersData(fetchedData);

        // const responses = await Promise.all(ids.map(id => axios.get<DataType>(`https://api.example.com/data/${id}`)));
        // const fetchedData = responses.map(response => response.data);
        // setData(fetchedData);
    }

    useEffect(() => {
        getCharacters();
    }, [])

    return (
        <div>
            
            <div className="page_charactersInLoc">
                <div className="title">
                    <div className="text">Characters in</div>
                    <div className="theLoc">
                        <LocationIcon />
                        <div className="loc">{locationList[Number(locationId)]}</div>
                    </div>
                </div>

                <div className="list_characters">
                    {charactersData && charactersData?.map((c) => (
                        <Link to={`/character-detail/${c.id}`} className="item_character">
                            <img src={c.image} alt="avatar" />
                            <div className="name">{c.name.length > 15 ? c.name.substring(0,15) + "..." : c.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PageLocation