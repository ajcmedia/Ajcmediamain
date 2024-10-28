

import Navbar from "@/app/components/navbar/page";
import styles from "@/app/home.module.scss"
import Footer from "@/app/components/footer/page";
import Collage from "./components/collage/page";
import Products from "./components/products/page";
import Aboutme from "./components/aboutme/page";

export default function Home() {
  return (
    <main className={styles.MainContainer}>
      <div className={styles.MainContainer2}>
        <div className={styles.Submaincon2}>
          <h1>Welcome to <br></br>AJC media</h1>
          <p>Discover captivating Images showcasing the beauty of <span>Vancouver</span> life. From birthdays to baby showers, each moment is expertly captured for timeless memories. Let's create something unforgettable together!</p>
          <a href="#">Book a session now!</a>
        </div>
      </div>
      <div className={styles.AboutMeContainer}>
        <Aboutme />
      </div>
    </main>
  );
}

