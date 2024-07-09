
import styles from "./form.module.scss";
import Image from "next/image"


export default function Form() {
  return (
    <main className={styles.mainFormContainer}>
      {/* <div className={styles.mainFormContainer2}> first form of the Jinjuriki */}
      {/* <div className={styles.leftText}>
          <h1>Any <span>Questions?</span><br /></h1>
          <p>If you have any more questions regarding rates and wanted to see more image samples feel free to leave me a message</p>
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

      </div> */}
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1>Questions?</h1>
          <p>If you have any more questions regarding <span>rates</span> or wanting to see more <span>shots</span>, contact me below</p>
        </div>
        <div className={styles.formInputs}>
          <div className={styles.inputContainer}>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" /> </div>
          <div className={styles.inputContainer}>
            <input type="email" placeholder="Email" />
            <input type="phone" placeholder="Phone Number" />
          </div>
          <div className={styles.textAreaContainer}>
            <textarea name="postContent" placeholder="Questions / Inquiries" />
          </div>

          <div className={styles.agreeBox}>
            <input type="checkbox" id="subscribe" name="subscribe" value="subscribe" />
            <label htmlFor="subscribe">I agree that by submitting this form, my personal information will be collected, processed, and stored. This is done to respond to my inquiry and to maintain ongoing communication for any assistance I may need.</label>
          </div>
          <div className={styles.buttonDiv}>
            <button>Submit</button>
          </div>


        </div>
      </div>
    </main >
  )
}