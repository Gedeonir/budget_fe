import axios from "axios";

const API_URL = "process.env.BACKEND_URL/api/budget/forecast"; // Replace with your backend URL

export const getForecast = async (predictYears = 6) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/budget/forecast`, {
      params: { predictYears },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};
