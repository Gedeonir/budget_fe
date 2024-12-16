import React, { useCallback, useState } from 'react'


const AddTransaction = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      alert(`File uploaded: ${selectedFile.name}`);
      // Add file upload logic here
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div  className='w-full absolute left-0 inset-y-0 h-full bg-primary bg-opacity-50 flex lg:items-center lg:justify-center items-center'>
      <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-3/4 w-full lg:px-4 px-2 py-4'>

        <div className="relative w-64">
          {/* Dropdown Trigger */}
          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
            Select a File
          </button>

          {/* Dropdown Menu */}
          <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-lg w-full">
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* File Input */}
              <label className="block">
                <span className="text-gray-700">Upload File</span>
                <input
                  type="file"
                  className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                  onChange={handleFileChange}
                />
              </label>

              {/* Display Selected File */}
              {selectedFile && (
                <p className="text-sm text-gray-600">Selected File: {selectedFile.name}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
              >
                Upload
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddTransaction