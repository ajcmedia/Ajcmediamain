
import styles from "./footer.module.scss";
import Image from "next/image"


export default function Footer() {
  return (
    <main className={styles.mainFooterContainer}>
      <Image
        src={"/logo2.svg"}
        alt="logo"
        width={120}
        height={50}
        className={styles.logosmall}
      />
      <p>Connect with me on other platforms to stay updated on my latest projects, see behind-the-scenes moments, and explore more of my creative journey</p>
      <div className={styles.Links}>
        <div className={styles.socialLinks}>
          <a href="https://www.facebook.com/JayCphotography88">  <Image
            src={"/facebook.svg"}
            alt="fb"
            width={20}
            height={20}
            className={styles.logosmall}
          /></a>
          <a href="https://www.instagram.com/ajcmedia.ca/"> <Image
            src={"/instagram.svg"}
            alt="ig"
            width={20}
            height={20}
            className={styles.logosmall}
          /></a>
          <a href='https://www.m.me/jayson.chua.750'>
            <Image
              src={"/messenger.svg"}
              alt="ms"
              width={20}
              height={20}
              className={styles.logosmall}
            /></a></div>
        <div className={styles.quickLinks}>
          {/* <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Products</a> */}<p>Copyright 2023 Ajc Media , Vancouver BC</p>
        </div>


      </div>
      <div className={styles.copyright}>
        <p>Copyright 2023 Ajc Media , Vancouver BC</p>
      </div>
    </main>
  )
}