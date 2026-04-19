import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies = [],
  categories = [],
  activeCategory,
  setActiveCategory,
  onMovieClick,
  onToggleWatchlist,
  isInWatchlist,
  title,
}) {
  // ✅ TMDB genre mapping
  const genreMap = {
    Action: 28,
    Drama: 18,
    Comedy: 35,
    Horror: 27,
    "Sci-Fi": 878,
  };

  // ✅ Filter using genre_ids (API format)
  const filteredMovies =
    activeCategory === "All"
      ? movies
      : movies.filter(
          (movie) =>
            Array.isArray(movie.genre_ids) &&
            movie.genre_ids.includes(genreMap[activeCategory])
        );

  return (
    <section className="movie-grid-section">
      {title && <h2 className="section-title">{title}</h2>}

      {/* CATEGORY BAR */}
      {categories.length > 0 && (
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!filteredMovies || filteredMovies.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p>No movies found. Try another category.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => {
            if (!movie || !movie.id) return null;

            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={onMovieClick}
                onToggleWatchlist={onToggleWatchlist}
                isInWatchlist={isInWatchlist?.(movie.id)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}