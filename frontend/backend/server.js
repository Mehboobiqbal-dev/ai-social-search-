import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchProfiles } from "./searchAI.js";
import { scrapeGitHub } from "./scrape.js";
import connectDB from "./database.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Search API
app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  const results = await searchProfiles(q);
  res.json(results);
});

// Scraping API (Fetch GitHub profiles)
app.get("/api/scrape/:username", async (req, res) => {
  const profile = await scrapeGitHub(req.params.username);
  res.json(profile);
});

app.listen(5000, () => console.log("Server running on port 5000"));
