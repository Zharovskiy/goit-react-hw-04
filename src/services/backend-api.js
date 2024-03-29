import axios from "axios";

// axios.defaults.baseURL = "https://api.unsplash.com";

// Таким записом можна додати кілька базових URL
const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const fetchImagesSearch = async (query, pageNumber) => {
  const response = await instance.get("/search/photos", {
    params: {
      client_id: "q_ilJfeXbJ7aLVkUf1TArJA5EUScrQgLm08H3UJvYpI",
      query: query,
      orientation: "landscape",
      page: pageNumber,
      per_page: 12,
    },
  });
  return response.data;
};
