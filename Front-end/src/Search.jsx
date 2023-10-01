import { useState } from 'react';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement your search logic here using the searchQuery state.
    console.log('Searching for:', searchQuery);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Search;
