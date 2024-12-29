import axios from 'axios';
export const handleDownload = async (start,end,inst,docType) => {
  try {    
    // Define request body
    const requestBody = {
      startDate: start,
      endDate: end,
      inst:inst?.getProfile?.institution?._id,
      docType:docType
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
    const blob = new Blob([response.data], { type: docType?.toLowerCase() === 'pdf'?'application/pdf':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (blob.size > 0) {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = docType?.toLowerCase() === 'pdf'?'transactions_history.pdf':'transactions_history.xlsx';
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

