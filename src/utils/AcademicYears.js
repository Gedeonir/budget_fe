function getAcademicYears(){
    let year = new Date().getFullYear();
    let lastyear = new Date().getFullYear()-1;
    let range = [];
    let lastrange = [];
    let academicYear=[];
    lastrange.push(lastyear);
    range.push(year);
    for (let i = 1; i < 100; i++) 
    {
        lastrange.push(lastyear + i);    
        range.push(year + i);
        academicYear.push(lastrange[i-1]+"-"+(lastrange[i]).toString().slice(-2));
        let fullyear = lastrange.concat(range);
    }
    return academicYear;
}

export default getAcademicYears