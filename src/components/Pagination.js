import React from 'react';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

    const Pagination = ({ postsPerPage, length}) => {
        const paginationNumbers = [];

        for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
            paginationNumbers.push(i);
        }

        return (
            <div className='lg:flex justify-between gap-2 mt-2'>
                <div className='flex lg:justify-start my-4 justify-between items-center text-text_primary'>
                    <MdNavigateBefore size={25}/>
                    <div className='px-4 flex justify-start'>
                        {paginationNumbers.map((pageNumber) => (
                            <button key={pageNumber} className='border text-secondary hover:bg-secondary duration-300 delay-200 hover:text-primary2 cursor-pointer border-secondary h-8 w-8 px-2'>{pageNumber}</button>
                        ))}
                    </div>
                    <MdNavigateNext size={25}/>
                </div>
                <div className='flex justify-start items-center gap-2 my-4'>
                    <label className='text-text_primary text-lg font-medium outline-none placeholder:text-primary'>Jump to page</label>
                    <input type='number' className='w-24 border-2 border-primary rounded-lg px-2' placeholder='Page'/>
                </div>
                
            </div>
        );
    };
    export default Pagination;