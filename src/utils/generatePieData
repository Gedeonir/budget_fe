export function calculateTotalsByCategory(transactions,year) {

    const categoryColors = {
        "Food": "#f44336",
        "Transport": "#2196f3",
        "Household": "#ff9800",
        "Rent": "#f44337",
        "Salaries": "#2196f9",
        "Medical": "#ff9806",
        "Health Human Resources": "#f44336",
        "Maternal and Child Health": "#2196f3",
        "Financial and Geographical Accessibility": "#ff9800",
        "Health Sector Planning and Information": "#f44337",
        "Disease Prevention and Control": "#2196f9",
        "Specialized Health Services": "#ff9806",
      };

    // Initialize an object to store totals
    const categoryTotals = {};
  
    // Iterate through each transaction

    const yearlyTransactions = transactions?.filter((transaction) => {
      const transactionYear = transaction.budget.fyi;      
      return transactionYear === year && transaction.type.toLowerCase() === "expense"; // Only consider "Expense"
    });


    

    yearlyTransactions?.forEach((transaction) => {
      const category = transaction.category;
      const amount = parseFloat(transaction.amount);
  
      // Ensure the category exists in the categoryTotals object
      if (!categoryTotals[category]) {
        categoryTotals[category] = { value: 0, label: category, color: categoryColors[category] };
      }
  
      // Add the amount to the category total
      categoryTotals[category].value += amount;
    });
  
    // Convert the categoryTotals object into an array
    return Object.values(categoryTotals);
  }
  
  
  