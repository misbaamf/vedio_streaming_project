const API_KEY = "adbbfd97b9a55261170cb1567528e079";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  const data = await response.json();
  return data.results;
};