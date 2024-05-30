export const paginate = (totalPage:number, currentPage:number) => {
    const prev = currentPage !== 1;
    const next = currentPage !== totalPage;

    let numbersL = currentPage-1;
    let numbersR = currentPage+1;

    const arr = [(prev ? "<" : null),
                "1",
                (currentPage - 2 > 1 ? "..." : null),
                (numbersL > 1 ? numbersL : null),
                (currentPage===1 || currentPage===totalPage ? null : currentPage), 
                (numbersR < totalPage ? numbersR : null), 
                (currentPage + 2 < totalPage ? "..." : null),
                (totalPage!==1 ? totalPage : null),
                (next ? ">" : null)]

    let res = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== null) {
            res.push(arr[i])
        }
    }

    return res;
}