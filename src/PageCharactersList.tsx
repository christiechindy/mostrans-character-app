import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LocationContext, TContextData } from "./context/LocationContext";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";

export interface ICharacterData {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    },
    image: string,
    episode: string[],
    url: string,
    created: string,
}

const PageCharactersList = () => {
    const [searchParams] = useSearchParams();
    const currentPageInLink:number = parseInt(searchParams.get('page') || "1"); // Default to page 1

    const [characters, setCharacters] = useState<ICharacterData[]>();

    const [totalPages, setTotalPages] = useState<number>();
    const {setCharacterCount} = useContext(LocationContext) as TContextData;
    const getData = async () => {
        const ax = await axios.get(`${process.env.REACT_APP_API}/character?page=${currentPageInLink}`);
        const data = ax?.data;
        setCharacters(data?.results);
        setCharacterCount(data?.info?.count);

        const totalPage = data?.info?.pages;
        setTotalPages(totalPage);
    }

    useEffect(() => {
        getData();
    }, [currentPageInLink])

    return (
        <>
            <Navbar />

            <div className="page_list">
                <div className="list_characters">
                    {characters && characters?.map((c) => (
                        <Link to={`/character-detail/${c.id}`} className="item_character">
                            <img src={c.image} alt="avatar" />
                            <div className="name">{c.name.length > 15 ? c.name.substring(0,15) + "..." : c.name}</div>
                        </Link>
                    ))}
                </div>
                
                {totalPages &&
                    <Pagination currentPage={currentPageInLink} pathname="/list-characters" totalPage={totalPages} />
                }
            </div>
        </>
    );
};

export default PageCharactersList;
