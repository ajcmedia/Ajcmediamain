import Image from "next/image";
import Navbar from "@/app/components/navbar/page";
import styles from "@/app/home.module.scss"
import Footer from "@/app/components/footer/page";
import Collage from "./components/collage/page";
import Products from "./components/products/page";

export default function Home() {
  return (
    <main className={styles.landingContainer}>

      <div className={styles.landingContainer2}>
        <div className={styles.landingBanner}>
          <Navbar />
          <div className={styles.contentsMain}>

            <h1>My name is Jayson, I am a <span>Photographer</span></h1>
            <p>I wanted to enhance my photography skills by sharing what i am capable of to others</p>
            <div className={styles.socials}>
              <div className={styles.socialLinks}>
                <Image
                  width={30}
                  height={30}
                  src="/facebook.svg"
                  alt="logo"
                  className={styles.fb1}
                />
                <a href="https://www.facebook.com/jayson.chua.750">
                  <Image
                    width={30}
                    height={30}
                    src="/facebook_hover.svg"
                    alt="logo"
                    className={styles.socialshover}
                  />
                </a>
              </div>

              <div className={styles.socialLinks}>
                <Image
                  width={30}
                  height={30}
                  src="/messenger.svg"
                  alt="logo"
                  className={styles.ms1}
                />
                <a href="https://www.m.me/jayson.chua.750">
                  <Image
                    width={30}
                    height={30}
                    src="/messenger_hover.svg"
                    alt="logo"
                    className={styles.socialshover}
                  />
                </a>
              </div>
              <div className={styles.socialLinks}>
                <Image
                  width={30}
                  height={30}
                  src="/instagram.svg"
                  alt="logo"
                  className={styles.ig1}
                />
                <a href="https://www.instagram.com/jaysonchua_/">
                  <Image
                    width={30}
                    height={30}
                    src="/instagram_hover.svg"
                    alt="logo"
                    className={styles.socialshover}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.collageMain}>
          <div className={styles.collageMain2}>
            <h1>&#8212; Image Showcase &#8212;</h1>
            <p>Discover captivating portraits, landscapes, and event photography showcasing the beauty of <span>Vancouver</span> life. From birthdays to baby showers, each moment is expertly captured for timeless <span>memories</span>. Let's create something unforgettable together!</p>
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
        <Footer />
      </div>




    </main>
  );
}
