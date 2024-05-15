
import styles from "./form.module.scss";
import Image from 'next/image'


export default function Form() {
  return (
    <main className={styles.mainFormContainer}>
      <div className={styles.mainFormContainer2}> {/* first form of the Jinjuriki */}
        <div className={styles.leftText}>
          <h1>Any <span>Questions?</span><br /></h1>
          <p>If you have any more questions regarding rates and wanting more image samples feel free to leave me a message</p>
        </div>
        <div className={styles.rightForm}>
          <input type="text" placeholder="Name" />
          <div className={styles.personalInput}>
            <input type="email" placeholder="Email" />
            <input type="phone" placeholder="Phone Number" />
          </div>
          <textarea name="postContent" placeholder="Questions / Inquiries" />
          <div className={styles.agreeBox}>
            <input type="checkbox" id="subscribe" name="subscribe" value="subscribe" />
            <label htmlFor="subscribe">by checking the box you agree to provide information to AJC media so that we can contact you.</label>
          </div>
          <div className={styles.buttonDiv}>
            <button>Submit</button>
          </div>
        </div>

      </div>
    </main >
  )
}