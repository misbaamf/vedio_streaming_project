export default function MovieCard({
  movie,
  onClick,
  onToggleWatchlist,
  isInWatchlist,
}) {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      
      {/* IMAGE WRAPPER */}
      <div className="card-image-wrap">

        {/* 🖼️ POSTER IMAGE (TMDB FIX) */}
        <img
          src={
            movie.poster_path
              ? `${IMAGE_URL}${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title || "Movie"}
          className="card-image"
        />

        {/* 🎥 HOVER VIDEO PLACEHOLDER (optional - safe fallback) */}
        <div className="card-video" />

        {/* OVERLAY BUTTONS */}
        <div className="card-overlay">
          
          {/* PLAY BUTTON */}
          <button
            className="card-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick(movie);
            }}
          >
            ▶
          </button>

          {/* WATCHLIST BUTTON */}
          <button
            className={`card-bookmark ${
              isInWatchlist ? "active" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(movie);
            }}
          >
            {isInWatchlist ? "❤️" : "🤍"}
          </button>
        </div>

        {/* ⭐ RATING */}
        <div className="card-rating">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="card-info">
        <h3 className="card-title">
          {movie.title || "Untitled"}
        </h3>

        <div className="card-meta">
          <span>
            {movie.release_date
              ? movie.release_date.slice(0, 4)
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}