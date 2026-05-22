import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const COUNTRIES = [
  { code: 'us', name: '🇺🇸 US' },
  { code: 'gb', name: '🇬🇧 UK' },
  { code: 'in', name: '🇮🇳 India' },
  { code: 'au', name: '🇦🇺 Australia' },
  { code: 'ca', name: '🇨🇦 Canada' },
  { code: 'de', name: '🇩🇪 Germany' },
  { code: 'fr', name: '🇫🇷 France' },
  { code: 'jp', name: '🇯🇵 Japan' },
]

function Navbar({ dark, toggleTheme, country, onCountryChange }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.elements.navSearch.value.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      e.target.reset();
    }
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">News Daily</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/science">Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookmarks">★ Bookmarks</Link>
            </li>
          </ul>
          <select
            className="form-select form-select-sm me-2"
            style={{ width: 'auto' }}
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            title="Select country"
          >
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          <form className="d-flex gap-2 me-2" onSubmit={handleSearch}>
            <input
              name="navSearch"
              className="form-control form-control-sm"
              type="search"
              placeholder="Search news..."
              aria-label="Search"
            />
            <button className="btn btn-outline-light btn-sm" type="submit">Search</button>
          </form>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={toggleTheme}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar