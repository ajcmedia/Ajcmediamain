
import styles from "./form.module.scss";



export default function Form() {
  return (
    <main className={styles.mainFormContainer}>
      <div className={styles.formText}>
        <h1>Get in touch</h1>
        <p>If you have any additional questions about my rates, need more image samples, or would like to discuss a personalized photography package, please don’t hesitate to reach out.Leave me a message!</p>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.inputDiv}>
        <input type="text" placeholder="First name" className={styles.input1} />
          <input type="text" placeholder="Last name" className={styles.input1} />
        </div>
        <div className={styles.inputDiv}>
          <input type="text" placeholder="Email" className={styles.input2} />
          <input type="text" placeholder="Phone number" className={styles.input3} />
        </div>
        <textarea name="postContent" placeholder="Questions / Inquiries" />
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="terms" className={styles.checkbox} />
          <label htmlFor="terms">I agree that by submitting this form, I consent to AJC Media collecting and processing my personal information. I understand that my information will only be used to respond to my inquiry and provide relevant updates.
          </label>
        </div>
        <div className={styles.buttonDiv}><button type="submit" className={styles.submitButton}>Submit</button></div>
      </div>
    </main >
  )
}