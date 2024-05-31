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

    const getCharacterData = async () => {
        const ax = await axios.get(`${process.env.REACT_APP_API}/character/${id}`);
        const data:ICharacterData = ax?.data;
        setCharacter(data);
    }

    useEffect(() => {
        getCharacterData();
    }, [])

    const {locationList, setLocationList, peopleLocationData, setPeopleLocationData} = useContext(LocationContext) as TContextData;
    const [locationEditMode, setLocationEditMode] = useState<boolean>(locationList[peopleLocationData[Number(id)]] ? false:true);
    const [locationInput, setLocationInput] = useState<string>(locationList[peopleLocationData[Number(id)]] ?? "");

    const handleLocationButton = () => {
        if (locationEditMode) {
            const prevLocID = peopleLocationData[Number(id)];
            console.log("the prevLocID is, ", prevLocID);
            let newLocID;
            // if locationInput not in the list
            if (!locationList.includes(locationInput)) {
                newLocID = locationList.length;
                setLocationList([...locationList, locationInput]);
            } else { // if there
                newLocID = locationList.indexOf(locationInput);
            }
            
            // then change the peopleLocationData
            assignCharToNewLocID(prevLocID, newLocID)
            // if noChar is in the prevLoc, change the element to empty string            
            // checkPrevLocIfNoneDelete(prevLocID);
            // in calling checkPrevLocIfNoneDelete(), we need to check it against the updated value,
            // as we cant do that (since the async nature of state update in React), then we'll call that function inside the assignCharToNewLocID function.
        }

        setLocationEditMode(prev => !prev);
    }

    const assignCharToNewLocID = (prevLocID: number, newLocID: number) => {
        setPeopleLocationData(prev => {
            const tmp = [...prev];
            tmp[Number(id)] = newLocID;
            checkPrevLocIfNoneDelete(prevLocID, tmp);
            return tmp;
        })
    }

    const checkPrevLocIfNoneDelete = (prevLocID: number, peopleLocationDataa: number[]) => {
        // only do this when the edit happens, not when it is the first time inputting the location
        if (prevLocID !== -1 && prevLocID !== null) {
            let noOneInPrevLoc = true;
            for (let i = 0; i < peopleLocationDataa.length; i++) {
                if (peopleLocationDataa[i] === prevLocID) {
                    noOneInPrevLoc = false;
                    break;
                }
            }
            if (noOneInPrevLoc) {
                setLocationList(prev => {
                    const tmp = [...prev];
                    tmp[prevLocID] = "";
                    return tmp;
                })
            }
        }
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
