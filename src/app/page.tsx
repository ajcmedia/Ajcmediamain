import Image from "next/image";
import Navbar from "@/app/components/navbar/page";
import styles from "@/app/home.module.scss"
import Footer from "@/app/components/footer/page";

export default function Home() {
  return (
    <main className={styles.landingContainer}>
      <div className={styles.landingBanner}>



        <div className={styles.landingBannerContent}>
          <Navbar />
          <div className={styles.landingBannerContentText}>
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

      </div>


      <Footer />
   


    </main>
  );
}
