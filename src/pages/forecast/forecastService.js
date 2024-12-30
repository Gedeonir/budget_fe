import axios from "axios";

const API_URL = "http://localhost:7000/api/budget/forecast"; // Replace with your backend URL

export const getForecast = async (predictYears = 6) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { predictYears },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};
