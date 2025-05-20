import Image from "next/image";
import styles from "./aboutme.module.scss";

export default function Aboutme() {
    return (
        <section className={styles.aboutMainContainer}>
            <div className={styles.aboutMainContainer2}>
                <Image width={500} height={500} src="/image1.jpg" alt="myImage" />
                <div className={styles.aboutMeInfo}>
                    <h1>My name is Jayson Chua<br></br>
                        freelance Photographer</h1>
                    <div className={styles.imageContainer}><Image width={500} height={500} src="/image1.jpg" alt="myImage" /></div>
                    <p>As a freelance photographer based in Vancouver, originally from the Philippines, I focus on capturing meaningful moments with creativity and empathy. While specializing in portraits, I also cover events like baby showers, gender reveals, birthdays, and weddings, which inspire me to capture cherished memories. My work is driven by a passion for storytelling through photography</p>
                    <div className={styles.info}>
                        <a><span>&#124;</span> Doing photography since 2022 </a>
                        <a><span>&#124;</span> Efficient in editing using Adobe photoshop </a>
                        <a><span>&#124;</span> Videographer partner for events </a>
                       
                    </div>
                </div>
            </div>
        </section>
    );
}

// This is a test push
