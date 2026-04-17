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
      {!movies || movies.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p>No movies found. Try search or category.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => {
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