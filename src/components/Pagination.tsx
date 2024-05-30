"use client";
import { paginate } from "../utils/pagination";
import PrevIcon from "../icons/PrevIcon";
import NextIcon from "../icons/NextIcon";
import { useNavigate } from "react-router-dom";

interface IProps {
    totalPage: number,
    currentPage: number,
    pathname: string
}

const Pagination = ({totalPage, currentPage, pathname}: IProps) => {
    const router = useNavigate();

    return ( 
        <div className="pagination">
            <div className="pageNumber">
                {paginate(totalPage, currentPage).map((l) => (
                    l==="<" ? <div onClick={() => router(`${pathname}?page=${currentPage-1}`)}><PrevIcon/></div> : 
                    l===">" ? <div onClick={() => router(`${pathname}?page=${currentPage+1}`)}><NextIcon/></div> :
                    l==="..." ? <div className="dots">...</div> :
                    <div className={currentPage===Number(l) ? "active" : ""} onClick={() => router(`${pathname}?page=${l}`)}>{l}</div>
                ))}
            </div>
        </div>
    )
}

export default Pagination