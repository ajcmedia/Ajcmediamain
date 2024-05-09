
import styles from "./product.module.scss";
import Image from 'next/image'


export default function Products() {
  return (
    <main className={styles.mainProductContainer}>
      <div>
        <h1>Products <span>|</span></h1>
        <p>These are the things that are available within availing the <span>photoshoot sessions</span> and also additional products that can be purchased separately </p>
        <div className={styles.productCards}>
          <div className={styles.card}>
            <Image
              width={50}
              height={50}
              src="/digital.svg"
              alt="logo"
              className={styles.productimage}
            />
            <h2>Digital Pictures</h2>
            <p>Digital pictures are included with the session, editted pictures which you would choose will be sent to you.</p>
          </div>
          <div className={styles.card}>
            <Image
              width={50}
              height={50}
              src="/printer.svg"
              alt="logo"
              className={styles.productimage}
            />
            <h2>Printed Pictures</h2>
            <p>Pictures taken by me will be available as a separate purchase, ranging from various sizes of your liking.</p>
          </div>
          <div className={styles.card}>
            <Image
              width={50}
              height={50}
              src="/album.svg"
              alt="logo"
              className={styles.productimage}
            />
            <h2>Photo Albums</h2>
            <p>I can provide photo albums for my clients as a separate part of the package if they want to avail. want to see samples? let me know</p>
            </div>
        </div>
        <div className={styles.booknow}>
        <p>What are you waiting for? Book now</p>
        <Image src="/down.svg" alt="logo" width={50} height={50} />
        </div>
      </div>

    </main>
  )
}