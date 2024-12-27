import React from 'react';
import axios from 'axios';
export const handleDownload = async (start,end,inst) => {
  try {    
    // Define request body
    const requestBody = {
      startDate: start,
      endDate: end,
      inst:inst?.getProfile?.institution?._id
    };

    // Make API call
    const response = await axios.post(`${process.env.BACKEND_URL}/budget/reports/budget/pdf`, requestBody, {
      responseType: 'blob', // Important to get binary data (PDF)
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });  

    // Create a blob from the response
    const blob = new Blob([response.data], { type: 'application/pdf' });

    if (blob.size > 0) {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'transactions_history.pdf';
      document.body.appendChild(link); // Append link to the DOM
      link.click();
      document.body.removeChild(link); // Clean up the DOM
      window.URL.revokeObjectURL(link.href);
    } else {
      console.error('Failed to create valid PDF Blob');
    }
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Failed to download the PDF. Please try again.');
  }
};

const Reports = () => {
  

  return (
    <div>
      <button onClick={handleDownload}>Download Budget PDF</button>
    </div>
  );
};

export default Reports;
