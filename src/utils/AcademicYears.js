function getAcademicYears(data){
    let lastrange = [];
    data?.resp?.data?.map((item)=>{        
        lastrange.push(item.fyi);
    })
    return lastrange;
}

export default getAcademicYears