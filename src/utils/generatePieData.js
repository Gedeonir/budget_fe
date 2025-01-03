const generateColorsForCategories = (transactions) => {
  const colors = [
    "#f44336",
    "#2196f3",
    "#ff9800",
    "#f44337",
    "#2196f9",
    "#ff9806",
    "#e91e63", // Vibrant Pink
    "#9c27b0", // Deep Purple
    "#673ab7", // Purple
    "#3f51b5", // Indigo
    "#00bcd4", // Cyan
    "#009688", // Teal
    "#4caf50", // Green
    "#8bc34a", // Light Green
    "#cddc39", // Lime
    "#ffeb3b", // Yellow
    "#ffc107", // Amber
    "#ff5722", // Deep Orange
    "#795548", // Brown
    "#607d8b", // Blue Grey
    "#f44336", // Red
    "#2196f3", // Blue
    "#ff9800", // Orange
    "#f44337", // Crimson
    "#2196f9", // Light Blue
    "#ff9806", // Bright Orange


  ];
  let colorIndex = 0;

  return transactions.reduce((result, { category }) => {
    if (!result[category]) {
      // Assign a color and rotate through the colors array
      result[category] = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;
    }
    return result;
  }, {});
};

export function calculateTotalsByCategory(transactions, year) {


  const categoryColors = generateColorsForCategories(transactions);


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


