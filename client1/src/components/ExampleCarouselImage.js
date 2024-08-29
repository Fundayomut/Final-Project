import React from 'react';
import PropTypes from 'prop-types';
import './ExampleCarouselImage.css';

const ExampleCarouselImage = ({ src, alt, caption }) => {
  return (
    <div>
      <div className="carousel-image-container">
        <img
          className="carousel-image"
          src={src}
          alt={alt}
        />
      </div>
      <div className="carousel-caption">
        {caption}
      </div>
    </div>
  );
};

ExampleCarouselImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  caption: PropTypes.node,
};

export default ExampleCarouselImage;
