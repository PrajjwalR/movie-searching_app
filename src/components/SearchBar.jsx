import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/App.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://www.omdbapi.com/';
  const API_KEY = '3da249cb';

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          setSuggestions(response.data.Search.slice(0, 5));
        } else {
          setSuggestions([]);
          setError(response.data.Error);
        }
      } catch {
        setError('Failed to fetch suggestions. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearchClick = async () => {
    if (!query) {
      setError('Please enter a movie name.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        onSearch(response.data.Search);
        setSuggestions([]);
      } else {
        setError(response.data.Error);
      }
    } catch {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (movie) => {
    setQuery(movie.Title);
    onSearch([movie]);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search movies by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          aria-label="Search movies"
        />
        <button
          onClick={handleSearchClick}
          className="search-button"
          disabled={loading}
          style={{ marginLeft: '10px' }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {loading && <p>Loading suggestions...</p>}
      {error && <p className="error-message">{error}</p>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((movie) => (
            <li
              key={movie.imdbID}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(movie)}
            >
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
