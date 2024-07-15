import React from 'react';

    const Pagination = ({ postsPerPage, length}) => {
        const paginationNumbers = [];

        for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
            paginationNumbers.push(i);
        }

        return (
            <div className='px-4 flex justify-start'>
                {paginationNumbers.map((pageNumber) => (
                    <button key={pageNumber} className='border text-secondary hover:bg-secondary duration-300 delay-200 hover:text-primary2 cursor-pointer border-secondary h-8 w-8 px-2'>{pageNumber}</button>
                ))}
            </div>
        );
    };
    export default Pagination;