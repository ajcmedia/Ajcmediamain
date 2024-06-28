
import Navbar from "@/app/components/navbar/page";
import styles from "@/app/home.module.scss"
import Footer from "@/app/components/footer/page";
import Collage from "./components/collage/page";
import Products from "./components/products/page";
import Form from "./components/form/page";

export default function Home() {
  return (
    <main className={styles.landingContainer}>

      {/* <div className={styles.landingContainer2}>
         <Navbar />
        <div className={styles.landingBanner}>
         
          <div className={styles.contentsMain}>

            <h1>My name is Jayson, I am a <span>Photographer</span></h1>
            <p>I wanted to enhance my photography skills by sharing what i am capable of to others</p>
          </div>
        </div>
        <div className={styles.collageMain}>
          <div className={styles.collageMain2}>
            <h2>Few Samples</h2>
            <p>Discover captivating portraits, and event photography showcasing the beauty of <span>Vancouver</span> life. From birthdays to baby showers, each moment is expertly captured for timeless <span>memories</span>. Let&apos;s create something unforgettable together!</p>
            <p>
              Portraits / Landscapes / Events / Product shots
            </p>
            <Collage />
          </div>
        </div>
        <div className={styles.productMain}>
          <div className={styles.productMain2}>
          <Products />
          </div>
        </div>

        <div className={styles.formMain}>
          <div className={styles.formMain2}>
          <Form />
          </div>
        </div>
        <Footer />
      </div> */}

     
        <Navbar />

    </main>
  );
}
