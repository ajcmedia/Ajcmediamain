"use client";
import React, { useState, useEffect } from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Disable scroll when navbar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <main className={styles.navcontainer}>
      <div className={styles.nav_sub_container}>
        <div className={styles.navleft2}>
          <Image
            src={isOpen ? "/logo2.svg" : "/logo1.svg"}
            alt="logo"
            width={120}
            height={100}
            className={styles.logosmall}
          />
        </div>

        <div className={styles.logodiv}>
          <Image
            src={isOpen ? "/logo2.svg" : "/logo1.svg"}
            alt="logo"
            width={120}
            height={100}
          />
        </div>

        <div className={styles.navleft}>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="product">Products</a>
        </div>

        {/* Mobile nav */}
        <div className={`${styles.navright} ${isOpen ? styles.show : ""}`}>
          <div className={styles.navlinks}>
            <a href="#" onClick={() => setIsOpen(false)}>About</a>
            <a href="#" onClick={() => setIsOpen(false)}>Services</a>
            <a href="product" onClick={() => setIsOpen(false)}>Products</a>
            <a href="#form" onClick={() => setIsOpen(false)}>Contact me</a>
          </div>
          <a 
            href="#form" 
            className={styles.contactme} 
            onClick={() => setIsOpen(false)}
          >
            Contact me
          </a>
        </div>

        {/* Hamburger */}
        <div
          className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <div className={styles.lines}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
