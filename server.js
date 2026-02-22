const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const YT = "https://www.googleapis.com/youtube/v3";

app.get("/api/youtube", async (req, res) => {
  const { endpoint, ...params } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });
  try {
    const response = await axios.get(`${YT}/${endpoint}`, {
      params: { ...params, key: apiKey }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
