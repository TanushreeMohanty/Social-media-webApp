import filterData from './assets/filterData.json'; // Assuming you have a JSON file with filter data
import { FiUpload } from 'react-icons/fi'; // Assuming you have imported the upload icon
import './customizeFilter.css'

function CustomizeFilter() {
  return (
    <div className="customize-filter-container">
      <span>Custom</span>
      <div className="filter-cards">
        {filterData.map((filter, index) => (
          <div key={index} className="filter-card">
            <img src={filter.imageUrl} alt={filter.name} />
            <h3>{filter.name}</h3>
          </div>
        ))}
        <div className="filter-card">
          <FiUpload />
          <h3>Upload Filter</h3>
        </div>
      </div>
    </div>
  );
}

export default CustomizeFilter;
