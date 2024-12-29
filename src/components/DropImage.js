import React from 'react'
import { useDropzone } from 'react-dropzone';
import {IoMdPhotos} from 'react-icons/io';

export default function DropImage({onDrop, accept,open}) {
    const {getRootProps,getInputProps,acceptedFiles,isDragActive}=useDropzone({onDrop, accept});
  return (
    <div>
        <div {...getRootProps({className:"dropzone border rounded-lg border-dashed flex items-center justify-center px-4 lg:h-56 h-full w-11/12 mx-auto cursor-pointer transition-all duration-1000 ease-in absolute top-0 left-0 w-full h-full text-text_primary bg-primary bg-opacity-50"})} >
            <input className="input-zone" {...getInputProps()} />
            <div className="text-center py-4 block text-text_primary">
                <IoMdPhotos size={30} className="mx-auto"/>
                {isDragActive?(
                    <p className="dropzone-content font-bold text-xs capitalize">
                        Release photo/video
                    </p>
                ):(
                    <p className="dropzone-content text-xs capitalize">
                        Add photo
                    </p>
                )}
                
            </div>
        </div>
    </div>
  )
}