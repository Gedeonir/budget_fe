import React, { useState, useEffect } from "react";
import { getForecast } from "./forecastService"; // API Service File
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Loading from "../../components/Loading";
import NoDataFound from "../../components/NoDataFound";

const ForecastData = () => {
    const [historicalData, setHistoricalData] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const data = await getForecast(6); // Predict next 6 years
                setHistoricalData(data.historical);
                setForecastData(data.forecast);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchForecast();
    }, []);

    if (loading) return <Loading />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-primary2 min-h-screen p-2">
            <h2 className="text-lg font-bold text-text_primary mb-4">Financial Forecast</h2>

            {historicalData.length >= 0 ? (
                <NoDataFound />
            )
                :
                (
                    <>
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-text_primary mb-2">Historical Data</h3>
                            <table className="table-auto w-full rounded-lg shadow-lg">
                                <thead className="bg-primary text-text_primary text-xs">
                                    <tr className="">
                                        <th className="px-4 py-2 text-left">FYI</th>
                                        <th className="px-4 py-2 text-left">Expenses</th>
                                        <th className="px-4 py-2 text-left">Incomes</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-text_primary text-xs">
                                    {historicalData.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                } text-gray-700`}
                                        >
                                            <td className="px-4 py-2">{item.fyi}</td>
                                            <td className="px-4 py-2">RF {item.expenses.toFixed(2)} </td>
                                            <td className="px-4 py-2">RF {item.incomes.toFixed(2)} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-text_primary mb-2">Forecast Data</h3>
                            <table className="table-auto w-full bg- rounded-lg shadow-lg">
                                <thead className="bg-primary text-text_primary text-xs">
                                    <tr>
                                        <th className="px-4 py-2 text-left">FYI</th>
                                        <th className="px-4 py-2 text-left">Predicted Expenses</th>
                                        <th className="px-4 py-2 text-left">Predicted Incomes</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-text_primary text-xs">
                                    {forecastData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">{item.fyi}</td>
                                            <td className="px-4 py-2">RF {item.predictedExpense.toFixed(2)} </td>
                                            <td className="px-4 py-2">RF {item.predictedIncome.toFixed(2)} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

            {/* Historical Data */}


            {/* Forecast Data */}


            {/* <BarChart width={600} height={300} data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fyi" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="predictedExpense" fill="#82ca9d" />
            </BarChart> */}
        </div>
    );
};

export default ForecastData;
