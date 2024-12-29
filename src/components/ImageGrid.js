import React from 'react'
import {MdOutlineEditNote} from 'react-icons/md';

const Image = ({ image,removeImage }) => {
    return (
      <div className="h-72 w-full items-center bg-text_secondary_2 rounded-lg bg-opacity-30 relative">
        <div className="cursor-pointer text-text_primary transition duration-150 ease-in-out absolute top-2 right-4 bg-text_secondary_2 rounded-full bg-opacity-50 p-2" onClick={()=>removeImage([])}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
        </div>
        <img
          alt={`img - ${image.id}`}
          src={image.src}
          className="h-full mx-auto"
        />
        <div className="cursor-pointer text-text_primary transition duration-150 ease-in-out absolute bottom-2 left-4 bg-text_secondary_2 rounded-full bg-opacity-50 p-2">
            <MdOutlineEditNote size={30}/>
        </div>
      </div>
    );
  };

export default function ImageGrid({images,setImages}) {
    const renderImage = (image, index) => {
        return <Image image={image} removeImage={setImages} key={`${image.id}-image`} />;
    };

    return (
    <section className="h-72">{images.map(renderImage)}</section>
    );
}