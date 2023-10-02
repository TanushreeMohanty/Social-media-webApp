import { useState } from 'react';
import '../styles/Search.css'; 
import DummyGallery from './dummyGallery';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="search-container">
      {/* Search-Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Gallery-Section */}
      <div className="gallery-section">
          <DummyGallery />
      </div>
    </div>
  );
}

export default Search;
