import axios from "axios";

// Call AI model API
export const searchProfiles = async (query) => {
  const { data } = await axios.post("http://localhost:8000/search", { query });
  return data;
};
