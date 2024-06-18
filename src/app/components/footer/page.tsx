
import styles from "./footer.module.scss";
import Image from "next/image"


export default function Footer() {
  return (
    <main className={styles.mainFooterContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}> <Image src="/footer.svg" alt="logo" width={170} height={170} /></div>

        <div className={styles.slogan}><h1>Let&apos;s capture and cherish<br/>your moments forever, <span>Book now!</span></h1></div>

        <div className={styles.footerLinksContainer}>

          <div className={styles.links}>
            <Image src="/mail.svg" alt="logo" width={20} height={20} /><a>Inquire@ajcmedia.ca</a>
          </div>

          <div className={styles.links}>
            <Image src="/phone.svg" alt="logo" width={20} height={20} /><a>(778) - 883 - 4378</a>
          </div>


          <div className={styles.links}>
            <Image src="/facebook.svg" alt="logo" width={20} height={30} /><a href='https://www.facebook.com/JayCphotography88'>Facebook</a>
          </div>

          <div className={styles.links}>
            <Image src="/instagram.svg" alt="logo" width={20} height={20} /><a href='https://www.instagram.com/jaysonchua_/'>Instagram</a>
          </div>

          {/* <div className={styles.links}>
            <Image src="/messenger.svg" alt="logo" width={20} height={20} /><a href='https://www.m.me/jayson.chua.750'>Messenger</a>
          </div> */}

        </div>
        <p>© 2024 AJC Media. All rights reserved.</p>
      </div>
    </main>
  )
}