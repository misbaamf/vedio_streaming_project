import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";

const API_KEY = "adbbfd97b9a55261170cb1567528e079";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const categories = ["All", "Action", "Drama", "Sci-Fi", "Horror", "Comedy"];

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const movieRes = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );
        const seriesRes = await fetch(
          `${BASE_URL}/tv/popular?api_key=${API_KEY}`
        );

        if (!movieRes.ok || !seriesRes.ok) {
          throw new Error("API request failed");
        }

        const movieData = await movieRes.json();
        const seriesData = await seriesRes.json();

        setMovies(movieData?.results || []);
        setSeries(seriesData?.results || []);
      } catch (err) {
        console.log("API ERROR:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SEARCH
  const query = searchQuery.toLowerCase().trim();

  const filteredMovies = movies.filter((m) =>
    (m.title || "").toLowerCase().includes(query)
  );

  const filteredSeries = series.filter((s) =>
    (s.name || "").toLowerCase().includes(query)
  );

  // NEW & HOT
  const newHotData = movies.filter((m) => m.vote_average >= 7.5);

  // WATCHLIST
  const toggleWatchlist = (item) => {
    setWatchlist((prev) =>
      prev.find((m) => m.id === item.id)
        ? prev.filter((m) => m.id !== item.id)
        : [...prev, item]
    );
  };

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  // LOADING
  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Loading movies... 🎬
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
        Failed to load data ❌ Check API key
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        watchlistCount={watchlist.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* HOME */}
      {currentPage === "home" && (
        <>
          {movies?.length > 0 && (
            <Hero
              featured={movies?.[0] || null}
              onWatch={() => setSelectedMovie(movies?.[0])}
              onAddWatchlist={() => toggleWatchlist(movies?.[0])}
              isInWatchlist={
                movies?.[0] ? isInWatchlist(movies[0].id) : false
              }
            />
          )}

          <MovieGrid
            movies={filteredMovies}
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onMovieClick={setSelectedMovie}
            onToggleWatchlist={toggleWatchlist}
            isInWatchlist={isInWatchlist}
            title="Trending Now"
            imageBase={IMAGE_URL}
          />
        </>
      )}

      {/* MOVIES */}
      {currentPage === "movies" && (
        <MovieGrid
          movies={filteredMovies}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onMovieClick={setSelectedMovie}
          onToggleWatchlist={toggleWatchlist}
          isInWatchlist={isInWatchlist}
          title="Movies"
          imageBase={IMAGE_URL}
        />
      )}

      {/* SERIES */}
      {currentPage === "series" && (
        <MovieGrid
          movies={filteredSeries}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onMovieClick={setSelectedMovie}
          onToggleWatchlist={toggleWatchlist}
          isInWatchlist={isInWatchlist}
          title="TV Series"
          imageBase={IMAGE_URL}
        />
      )}

      {/* NEW & HOT */}
      {currentPage === "newhot" && (
        <MovieGrid
          movies={newHotData}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onMovieClick={setSelectedMovie}
          onToggleWatchlist={toggleWatchlist}
          isInWatchlist={isInWatchlist}
          title="🔥 New & Hot"
          imageBase={IMAGE_URL}
        />
      )}

      {/* WATCHLIST */}
      {currentPage === "watchlist" && (
        <div className="page-container">
          <h2 className="section-title">My Watchlist</h2>

          {watchlist.length === 0 ? (
            <p style={{ textAlign: "center", color: "white" }}>
              Watchlist is empty 🎬
            </p>
          ) : (
            <MovieGrid
              movies={watchlist}
              categories={[]}
              activeCategory="All"
              setActiveCategory={() => {}}
              onMovieClick={setSelectedMovie}
              onToggleWatchlist={toggleWatchlist}
              isInWatchlist={isInWatchlist}
              title=""
              imageBase={IMAGE_URL}
            />
          )}
        </div>
      )}

      {/* MODAL (SAFE) */}
      {selectedMovie?.id && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onToggleWatchlist={toggleWatchlist}
          isInWatchlist={isInWatchlist(selectedMovie.id)}
        />
      )}

      <Footer />
    </div>
  );
}