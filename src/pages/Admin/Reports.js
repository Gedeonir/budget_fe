import React from 'react';
import axios from 'axios';

const Reports = () => {
  const handleDownload = async () => {
    try {
      // Define request body
      const requestBody = {
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      };

      // Make API call
      const response = await axios.post(`${process.env.BACKEND_URL}/budget/reports/budget/pdf`, requestBody, {
        responseType: 'blob', // Important to get binary data (PDF)
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      

      // Create a blob from the response
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a link to download the PDF
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'budget-overview.pdf'; // Default filename
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download the PDF. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Budget PDF</button>
    </div>
  );
};

export default Reports;
