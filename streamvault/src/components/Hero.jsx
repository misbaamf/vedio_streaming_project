export default function Hero({
  featured,
  onWatch,
  onAddWatchlist,
  isInWatchlist,
}) {
  if (!featured) return null;

  const IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const backdrop =
    featured?.backdrop_path || featured?.backdrop || "";

  const title =
    featured?.title || featured?.name || "Untitled";

  const description =
    featured?.overview || featured?.description || "";

  return (
    <section
      className="hero"
      style={{
        backgroundImage: backdrop
          ? `url(${IMAGE_URL}${backdrop})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>

        <p className="hero-description">{description}</p>

        <div className="hero-actions">
          <button
            className="btn-play"
            onClick={(e) => {
              e.stopPropagation();
              onWatch?.();
            }}
          >
            ▶ Play
          </button>

          <button
            className={`btn-watchlist ${isInWatchlist ? "added" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddWatchlist?.();
            }}
          >
            {isInWatchlist ? "✓ Added" : "+ My List"}
          </button>
        </div>
      </div>
    </section>
  );
}