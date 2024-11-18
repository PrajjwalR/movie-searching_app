import { useState } from 'react';
import Home from './components/Home';
import './styles/App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div>
     <div className="header-buttons">
  <button onClick={toggleDarkMode} className="toggle-dark-mode">
    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
  </button>
</div>
<Home />

   
    </div>
  );
};

export default App;
