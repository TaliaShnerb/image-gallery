import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 20;

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${(currentPage - 1) * photosPerPage}&_limit=${photosPerPage}`);
      setPhotos(res.data);
    };
    fetchPhotos();
  }, [currentPage]);

  const totalPages = Math.ceil(5000 / photosPerPage); // 5000 is the total number of photos available

  return (
    <div className="app">
      <h1>Photo Gallery</h1>
      <div className="grid">
        {photos.map(photo => (
          <div className="photo" key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
