import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageCover = () => {
    const router = useNavigate();
    const [showContent, setShowContent] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowContent(true);
            setTimeout(() => {
                router('/list-characters');
            }, 2000);
        }, 1200);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className='page_cover'>
            <div className={`main ${showContent ? "fadeOut" : ""}`}>
                <img src="/cover.png" alt="happy characters" />
                <div className="text" onClick={() => router("/list-characters")}>character?!</div>
            </div>

            <div className="me">developed by Chindy Christie Davina</div>
        </div>
    );
};

export default PageCover;
