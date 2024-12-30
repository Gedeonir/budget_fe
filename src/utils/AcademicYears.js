function getAcademicYears(data){
    let lastrange = [];
    data?.resp?.data?.map((item)=>{
        if(!lastrange.includes(item.fyi))        
            lastrange.push(item.fyi);
    })
    return lastrange;
}


export default getAcademicYears