export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>🎬 CineFlix</h2>
          <p>Your ultimate movie streaming experience.</p>
        </div>

        {/* LINKS */}
        <div className="footer-section">
          <h4>Browse</h4>
          <a href="#">Movies</a>
          <a href="#">TV Series</a>
          <a href="#">New & Hot</a>
          <a href="#">My List</a>
        </div>

        {/* COMPANY */}
        <div className="footer-section">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>🌐</span>
            <span>📸</span>
            <span>🐦</span>
            <span>▶️</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CineFlix. All rights reserved.
      </div>
    </footer>
  );
}