import '../styles/App.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Close Modal">X</button>
        <h2 id="modal-title">{movie.Title} ({movie.Year})</h2>
        <div id="modal-description">
          <p><strong>Type:</strong> {movie.Type}</p>
          <p><strong>Year:</strong> {movie.Year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
