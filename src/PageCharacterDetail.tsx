import React, { useContext, useState } from "react";
import { ICharacterData } from "./PageCharactersList";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LocationIcon from "./icons/LocationIcon";
import { LocationContext, TContextData } from "./context/LocationContext";

const PageCharacterDetail = () => {
    const {id} = useParams();

    const [character, setCharacter] = useState<ICharacterData>();
    const [locationEditMode, setLocationEditMode] = useState<boolean>(true);

    const getCharacterData = async () => {
        const ax = await axios.get(`${process.env.REACT_APP_API}/character/${id}`);
        const data:ICharacterData = ax?.data;
        setCharacter(data);
    }

    useEffect(() => {
        getCharacterData();
    }, [])

    const {locationList, setLocationList, peopleLocationData, setPeopleLocationData} = useContext(LocationContext) as TContextData;
    const haveLocationAlready = locationList[peopleLocationData[Number(id)]];

    const [locationInput, setLocationInput] = useState<string>(haveLocationAlready ?? "");
    const handleLocationButton = () => {
        let AtIndex = -1;
        if (locationEditMode) {
            // append the new location to the list if it has not already been in the list, else just change the mapping
            if (!locationList.includes(locationInput)) {
                AtIndex = locationList.length; //-1+1
                setLocationList([...locationList, locationInput]);
            } else {
                AtIndex = locationList.indexOf(locationInput);
            }

            console.log(`the id ${id} should have locationId ${AtIndex}`);

            setPeopleLocationData(prev => {
                const updated = [...prev];
                updated[Number(id)] = AtIndex;
                return updated;
            })
        }

        setLocationEditMode(prev => !prev);
    }

    return (
        <div className="page_detail">
            {character && 
            <div className="character_data">
                <div className="pict">
                    <img src={character?.image} alt={character?.name} />
                </div>
                <div className="name" onClick={() => {
                    console.log("locationList:", locationList);
                    console.log("map", peopleLocationData);
                }}>{character?.name}</div>
                <div className="box">
                    <div>Status : {character.status}</div>
                    <div>Species : {character.species}</div>
                </div>

                <div className="location">
                    <LocationIcon />
                    <input key={Number(id)} type="text" disabled={!locationEditMode} className={locationEditMode ? "edit" : "display"} value={locationInput} onChange={(e) => setLocationInput(e.target.value)} />
                    <button onClick={handleLocationButton}>{locationEditMode ? "OK" : "Edit"}</button>
                </div>
            </div>}
        </div>
    );
};

export default PageCharacterDetail;
