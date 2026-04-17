import { useState } from "react";

export default function Navbar({
  searchQuery,
  setSearchQuery,
  watchlistCount,
  currentPage,
  setCurrentPage,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        
        {/* LOGO */}
        <div className="navbar-left">
          <div className="logo" onClick={() => handleNavigate("home")}>
            <span className="logo-icon">▶</span>
            <span className="logo-text">StreamVault</span>
          </div>

          {/* DESKTOP NAV */}
          <div className="nav-links desktop-only">
            {["home", "movies", "series", "newhot"].map((page) => (
              <button
                key={page}
                className={`nav-link ${currentPage === page ? "active" : ""}`}
                onClick={() => handleNavigate(page)}
              >
                {page === "newhot"
                  ? "New & Hot"
                  : page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-right">
          
          {/* SEARCH */}
          <div className={`search-bar ${searchOpen ? "open" : ""}`}>
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              🔍
            </button>

            {searchOpen && (
              <input
                autoFocus
                className="search-input"
                type="text"
                placeholder="Search movies, series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          </div>

          {/* WATCHLIST */}
          <button
            className="icon-btn"
            onClick={() => handleNavigate("watchlist")}
          >
            ❤️
            {watchlistCount > 0 && (
              <span className="badge">{watchlistCount}</span>
            )}
          </button>

          {/* PROFILE */}
          <div className="avatar">A</div>

          {/* MOBILE MENU */}
          <button
            className="icon-btn mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          {["home", "movies", "series", "newhot", "watchlist"].map((page) => (
            <button
              key={page}
              className="nav-link"
              onClick={() => handleNavigate(page)}
            >
              {page === "newhot"
                ? "New & Hot"
                : page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}