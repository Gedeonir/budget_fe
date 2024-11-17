import React from 'react';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

    const Pagination = ({ postsPerPage, length,currentPage,handlePagination}) => {
        const paginationNumbers = [];

        for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
            paginationNumbers.push(i);
        }

        return (
            <div className='lg:flex justify-center gap-2 mt-2'>
                <div className='flex lg:justify-start my-4 justify-between items-center text-text_primary'>
                    <MdNavigateBefore size={25}/>
                    <div className='px-4 flex justify-start flex-wrap gap-2'>
                        {paginationNumbers.map((pageNumber,index) => (
                            <button key={pageNumber} className={`${currentPage === index? 'bg-secondary text-primary2':'text-secondary'} border  hover:bg-secondary duration-300 delay-200 hover:text-primary2 cursor-pointer border-secondary h-8 w-8 px-2 text-xs`} onClick={()=>handlePagination(index)}>{pageNumber}</button>
                        ))}
                    </div>
                    <MdNavigateNext size={25}/>
                </div>
               
                
            </div>
        );
    };
    export default Pagination;