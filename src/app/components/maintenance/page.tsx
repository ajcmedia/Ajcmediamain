

import Image from "next/image";
import Link from "next/link";
import styles from "./maintenance.module.scss";

export default function Maintenance() {
  return (
    <section className={styles.maintenance}>
      <div className={styles.maintenanceText}>
        <Image width={150} height={150} src="/logo1.svg" alt="logo" />
        <h1>AJC media will be <span>up</span> and <span>running</span> before you know it!</h1>
        <p>We are currently going through a maintenance. If you have any concerns regarding sessions, rates and more feel free to reach out.</p>
        <div className={styles.socials}>
          <div className={styles.socialslinks}><Image width={30} height={30} src="/phone.svg" alt="phone" /><a href="#">778 - 883 - 4378</a> </div>
          <div className={styles.socialslinks}><Image width={30} height={30} src="/facebook.svg" alt="fb" /><a href="https://www.facebook.com/jayson.chua.750">Jayson Chua</a></div>
          <div className={styles.socialslinks}><Image width={30} height={30} src="/mail.svg" alt="email" /><a href="mailto:inquire@ajcmedia.ca">Inquire@ajcmedia.ca</a></div>
          <div className={styles.socialslinks}><Image width={30} height={30} src="/instagram.svg" alt="email" /><a href="https://www.instagram.com/jaysonchua_/">Jayson Chua (IG)</a></div>
        </div>
      </div>
    </section>
  );
}
