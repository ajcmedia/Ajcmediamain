
import Navbar from "@/app/components/navbar/page";
import styles from "@/app/home.module.scss"
import Footer from "@/app/components/footer/page";
import Collage from "./components/collage/page";
import Products from "./components/products/page";
import Form from "./components/form/page";

export default function Home() {
  return (
    <main className={styles.MainContainer}>
      <div className={styles.MainContainer2}>
        <div className={styles.NameContent}>
          <h1>My name is Jayson I&apos;m a <span>Photographer</span></h1>
          {/* <h1>Welcome to <span>AJC Media</span></h1> */}
          <p>As a Photographer based in Vancouver I wanted to enhance my skills by sharing what I&apos;m capable of to others</p>
        </div>
      </div>

      <div className={styles.CollageContainer}>
      </div>

      <div className={styles.ProductContainer}>
        <Products />
      </div>

      <div>
        <Form />
      </div>
    </main>
  );
}
