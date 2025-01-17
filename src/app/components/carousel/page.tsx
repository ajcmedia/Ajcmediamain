"use client"
import React, { useState } from 'react';
import styles from "./carousel.module.scss";
import Image from 'next/image';

const images = [
  '/image1.png',
  '/image3.png',
  '/image2.png',
  '/image4.png',
  '/image5.png',
  '/image6.png'
];

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  }

  const displayedImages = [
    images[startIndex],
    images[(startIndex + 1) % images.length],
    images[(startIndex + 2) % images.length],
    images[(startIndex + 3) % images.length],
    images[(startIndex + 4) % images.length],
    images[(startIndex + 5) % images.length],
  ];

  return (
    <main className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {displayedImages.map((image, index) => (
   
            <Image src={image} alt={`carousel-${index}`} className={styles.carouselImage} width={300} height={1000} key={index}/>
   
        ))}
      </div>
      <div className={styles.buttonDiv}>
        <button onClick={handleNext} className={styles.carouselButton}>&lt;</button> 
        <button onClick={handlePrevious} className={styles.carouselButton}>&gt;</button>  
      </div>
    </main>
  );
}