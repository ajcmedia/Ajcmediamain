
import styles from "./navbar.module.scss";
import Image from 'next/image'

export default function Navbar() {
  return (
    <main className={styles.navcontainer}>
      <div className={styles.navleft}>
        <a href="#">Home</a>
        <a href="#">About</a>
      </div>
      <Image src="/logo1.svg" alt="logo" width={80} height={80} />
      <div className={styles.navright}>
        <a href="#">Portfolio</a>
        <button>Contact me</button>
      </div>
    </main>
  )
}