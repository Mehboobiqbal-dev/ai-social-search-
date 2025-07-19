import axios from "axios";
import cheerio from "cheerio";

export const scrapeGitHub = async (username) => {
  try {
    const res = await axios.get(`https://github.com/${username}`);
    const $ = cheerio.load(res.data);
    return {
      name: $("span.p-name").text().trim(),
      bio: $("div.p-note").text().trim(),
    };
  } catch (error) {
    return { error: "User not found" };
  }
};
