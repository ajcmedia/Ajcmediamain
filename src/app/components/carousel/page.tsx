"use client"
import React, { useState } from 'react';
import styles from "./carousel.module.scss";

const images = [
  'image1.jpg',
  'kitsilano.jpg',
  'image1.jpg',
  'image1.jpg',
  'image1.jpg',
  'image1.jpg'
];

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const displayedImages = [
    images[startIndex],
    images[(startIndex + 1) % images.length],
    images[(startIndex + 2) % images.length]
  ];

  return (
    <main className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {displayedImages.map((image, index) => (
          <img key={index} src={image} alt={`carousel-${index}`} className={styles.carouselImage} />
        ))}
      </div>
      <button onClick={handleNext} className={styles.carouselButton}>Next</button>
    </main>
  );
}