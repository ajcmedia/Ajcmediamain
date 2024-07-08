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

    // Cleanup function to reset the style
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <main className={styles.navcontainer}>
      <div className={styles.nav_sub_container}>
        <div className={styles.navleft2}>
          <Image src="/logo1.svg" alt="logo" width={80} height={80} className={styles.logosmall} />
        </div>

        <div className={styles.navleft}>
          <Image src="/logo1.svg" alt="logo" width={70} height={70} />
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Portfolio</a>
        </div>

        <div className={`${styles.navright} ${isOpen ? styles.show : ""}`}>
          <div className={`${styles.navlinks}`}>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Portfolio</a>
          </div>
          <a href="#">Contact me</a>
          <div className={styles.socials}>
            <div className={styles.socialLinks}>
              <Image width={25} height={25} src="/facebook.svg" alt="logo" className={styles.fb1} />
              <a href="https://www.facebook.com/jayson.chua.750">
                <Image width={25} height={25} src="/facebook_hover.svg" alt="logo" className={styles.socialshover} />
              </a>
            </div>

            <div className={styles.socialLinks}>
              <Image width={25} height={25} src="/messenger.svg" alt="logo" className={styles.ms1} />
              <a href="https://www.m.me/jayson.chua.750">
                <Image width={25} height={25} src="/messenger_hover.svg" alt="logo" className={styles.socialshover} />
              </a>
            </div>

            <div className={styles.socialLinks}>
              <Image width={25} height={25} src="/instagram.svg" alt="logo" className={styles.ig1} />
              <a href="https://www.instagram.com/jaysonchua_/">
                <Image width={25} height={25} src="/instagram_hover.svg" alt="logo" className={styles.socialshover} />
              </a>
            </div>
          </div>
        </div>

        <div className={`${styles.hamburger} ${isOpen ? styles.open : ""}`} onClick={toggleMenu}>
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