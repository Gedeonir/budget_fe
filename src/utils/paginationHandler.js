
export const pagination=(list,items)=>{
    const pages=[];

    for (let i = 0; i < list()?.length; i += items) {
        const item = list()?.slice(i, i + items);
        pages.push(item);
    }

    return pages;
}