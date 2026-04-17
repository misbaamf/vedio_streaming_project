import { useEffect, useState } from "react";

export default function MovieModal({
  movie,
  onClose,
  onToggleWatchlist,
  isInWatchlist,
}) {
  const [playing, setPlaying] = useState(false);

  const IMAGE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!movie) return null;

  const backdrop = movie?.backdrop_path
    ? `${IMAGE_URL}${movie.backdrop_path}`
    : "";

  const title = movie?.title || movie?.name || "Untitled";

  const rating = movie?.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const year = movie?.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close" onClick={onClose}>✕</button>

        <div
          className="modal-backdrop-img"
          style={{
            backgroundImage: backdrop ? `url(${backdrop})` : "none",
          }}
        >
          <div className="modal-backdrop-overlay" />

          {playing ? (
            <div className="video-placeholder">
              <p>Playing {title}...</p>
              <button onClick={() => setPlaying(false)}>Stop</button>
            </div>
          ) : (
            <div className="modal-backdrop-play">
              <button
                className="big-play-btn"
                onClick={() => setPlaying(true)}
              >
                ▶
              </button>
            </div>
          )}
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{title}</h2>

          <div className="modal-meta">
            ⭐ {rating} • {year}
          </div>

          <p className="modal-description">
            {movie?.overview || "No description available"}
          </p>

          <div className="modal-actions">
            <button
              className="btn-play"
              onClick={() => setPlaying(true)}
            >
              ▶ Watch Now
            </button>

            <button
              className={`btn-watchlist ${
                isInWatchlist ? "added" : ""
              }`}
              onClick={() => onToggleWatchlist?.(movie)}
            >
              {isInWatchlist ? "✓ Added" : "+ Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}