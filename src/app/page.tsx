

import styles from "@/app/home.module.scss"
import Footer from "@/app/components/footer/page";
import Aboutme from "@/app/components/aboutme/page";
import Form from "@/app/components/form/page"
import Carousel from "./components/carousel/page";



export default function Home() {
  return (
    <main className={styles.MainContainer}>
      <div className={styles.MainContainer2}>
        <div className={styles.Submaincon2}>
          <h1>Welcome to <br></br>AJC media</h1>
          <p>Discover captivating Images showcasing the beauty of <span>Vancouver</span> life. From birthdays to baby showers, each moment is expertly captured for timeless memories. Let&apos;s create something unforgettable together!</p>
          <a href="#">Book a session now!</a>
        </div>
      </div>


      <div className={styles.contentContainer}>

      </div>
      <Carousel />

      <div className={styles.contentContainer}>
        <Aboutme />

      </div>
      <div className={styles.formContainer}>
        <div className={styles.formContainer2}> <Form /></div>

      </div>
      <div className={styles.footerBackground}>
        <Footer />

      </div>

    </main>
  );
}

