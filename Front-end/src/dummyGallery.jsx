import './dummyGallery.css'; 
import dummyPics from './dummyPics';

function DummyGallery() {
  return (
    <div className="dummy-gallery">
      <div className="gallery-container">
        {dummyPics.map((pic, index) => (
          <div key={index} className="gallery-item">
            <img src={pic.img} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DummyGallery;
