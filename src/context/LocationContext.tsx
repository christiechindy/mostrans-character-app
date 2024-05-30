import { createContext, useEffect, useState } from "react"

export type TContextData = {
    characterCount: number;
    setCharacterCount: React.Dispatch<React.SetStateAction<number>>;
    locationList: string[];
    setLocationList: React.Dispatch<React.SetStateAction<string[]>>;
    peopleLocationData: number[];
    setPeopleLocationData: React.Dispatch<React.SetStateAction<number[]>>;
}

export const LocationContext = createContext<TContextData|null>(null);

interface IProps {
    children: any;
}

export const LocationContextProvider = ({children}: IProps) => {
    const [characterCount, setCharacterCount] = useState<number>(0);

    const [locationList, setLocationList] = useState<string[]>(JSON.parse(localStorage.getItem("locationList") || "[]"));
    const [peopleLocationData, setPeopleLocationData] = useState<number[]>(JSON.parse(localStorage.getItem("peopleLocationData") || "null") ?? Array.from({ length: characterCount+1 }, () => -1));

    useEffect(() => {
        localStorage.setItem("locationList", JSON.stringify(locationList));
    }, [locationList])

    useEffect(() => {
        localStorage.setItem("peopleLocationData", JSON.stringify(peopleLocationData));
    }, [peopleLocationData])

    return (
        <LocationContext.Provider value={{
            characterCount, setCharacterCount,

            locationList, setLocationList,
            peopleLocationData, setPeopleLocationData,
        }}>
            {children}
        </LocationContext.Provider>
    )
}