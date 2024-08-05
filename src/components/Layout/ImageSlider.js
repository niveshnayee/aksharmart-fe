import React, { useState, useEffect } from 'react';
import "../../styles/ImageSlider.css";

const ImageSlider = ({ images, width = '1450px', height = '500px' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const handleClick = (category) => {
    // Add your navigation logic here
    // e.g., history.push(`/products/${category}`);
  };

  return (
    <div className="slider-container" style={{ width, height }}>
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          
        }} 
        
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Slide ${index}`}
            className="slider-image"
            onClick={() => handleClick(image.category)}
          />
        ))}
      </div>
      <button className="slider-button prev-button" onClick={goToPrevious}>
        {'<'}
      </button>
      <button className="slider-button next-button" onClick={goToNext}>
        {'>'}
      </button>
      <div className="navigation-dots">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToImage(index)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
