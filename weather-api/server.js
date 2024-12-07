const express = require("express");
const axios = require("axios");
const app = express();

const API_KEY = "b8cc6cb7df5c94b7b544714ace8d800c";
const CITY = "Jakarta";
const COUNTRY = "ID";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const calculateAverage = (temps) =>
  temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

app.get("/test", async (req, res) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast`;
    const params = { q: `${CITY},${COUNTRY}`, appid: API_KEY, units: "metric" };
    const { data } = await axios.get(url, { params });

    const dailyForecasts = {};
    data.list.forEach(({ dt_txt, main: { temp } }) => {
      const date = dt_txt.split(" ")[0];
      (dailyForecasts[date] = dailyForecasts[date] || []).push(temp);
    });

    const averageDailyTemps = Object.entries(dailyForecasts)
      .slice(0, 6)
      .map(([date, temps]) => ({
        date,
        avgTemp: calculateAverage(temps).toFixed(2),
      }));

    const output = averageDailyTemps
      .map(({ date, avgTemp }) => `${formatDate(date)}: ${avgTemp}°C`)
      .join("\n");

    res.send(`Weather Forecast:\n${output}`);
  } catch (error) {
    console.error("Error saat mengambil data cuaca:", error.message);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data cuaca." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
