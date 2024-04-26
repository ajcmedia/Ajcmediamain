import Image from "next/image";
import Navbar from "@/app/components/navbar/page";
import styles from "@/app/home.module.scss"
import Footer from "@/app/components/footer/page";
import Collage from "./components/collage/page";

export default function Home() {
  return (
    <main className={styles.landingContainer}>

      <div className={styles.landingContainer2}>
        <div className={styles.landingBanner}>
          <Navbar />
          <div className={styles.contentsMain}>

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
        <div className={styles.collageMain}>
          <Collage/>
          {/* 
          portrait1 = https://lh3.googleusercontent.com/pw/AP1GczNkyucx_WIidTWJl1ob80uinEY8ot2eNNf2oLyb_VlxMcNzuEydzpv9225qGTi8wG3CwBKj77UUv7X-ZUNvEBmOmpA8qPZfx-Lq7EyoqrjrbEfHz8ZNXnI5bCb49QEFsozx_Ob00DBjfoYG5cVSkn7P=w630-h945-s-no-gm?authuser=0
          portrait2 = https://lh3.googleusercontent.com/pw/AP1GczPsriI0Xv8HhExQR7s-RbIx5Yz_s5lysXvYqFcvNa3UU5EBTZLjmvADlsnV14Mjhup1UWxcdULDqROaKUDa_SG-VwLUhlAoTK0ldIb5pe3qJ2p_GIixTT51JprU6WsQa2qeC6ifLZbHjup7OwDAZWkK=w630-h945-s-no-gm?authuser=0
          portrait3 = https://lh3.googleusercontent.com/pw/AP1GczN8hmW329li4fMmK_Oh_xv4T5Y-Wj-PdzeaHvb1aiuWZwCP2-CDIcS79zqFSc5VYGz_pyZBNNUYXP8Zq6iTzAdhCSSpd5RDGOYSGcvQiY2Abbv0OvNbuLglTm8-tNscabP2_MgJ2_4W-p78zHfLYsmq=w630-h945-s-no-gm?authuser=0
          portrait4 = https://lh3.googleusercontent.com/pw/AP1GczMevTr7uZzBTSfiOVPiB52SF7Ag2d67wVF_oP81FmfUQ5r1YObBP3Xj0hsxflIRhlb7CKeSpIc0E3MKFhDbPCERXO1aOsXZbQz1Uru7sIR0X_yKZ55RQnLIf9n9tyG8vo8LbVXtIMN77iElO5y6M8IG=w611-h945-s-no-gm?authuser=0
          portrait5 = https://lh3.googleusercontent.com/pw/AP1GczNtRWeX4I4VoBIzAtsrz3PqSg_pS9niJ7i1y8m-vikAzwwxD4UNU7atC1azqCaD5Euva0cuZc7mlMPWNUdx_GDHd-Z3ESV8sMXCyE2Xbgidpeow36vTEKgpKdmUq7-Go1TTYZpgSLUZKpUXgnunb2_M=w709-h945-s-no-gm?authuser=0
          car1 = https://lh3.googleusercontent.com/pw/AP1GczNWMIBFBGpgE8OUB-BPP1Hzf2BDQACWjHy7ogF4X1sZGaz2TdcHCq8ytGR5NdXmOB-mBqbWNwwBO-gNPS0OOJk02_8S27wAqr6SMEF6bqjlV5ktYiIJMwMkPEhoANidLtZVrskiO_UgU27HiIRVIXvB=w1418-h945-s-no-gm?authuser=0
          car2 = https://lh3.googleusercontent.com/pw/AP1GczOdK5TyuA4CjIDhPyzh-vJDtMTRPtifcne7TN-fNvXkynTDWCesiZdibi7S1B2fH2iyGmPv5vVzoZa0BNP6lW2Qkk3ooboyJynbF_sSSAttXhqIWhNyWk4BRsQ5JWunpu0PzsiY51jq3uGyGkQ7nva9=w1418-h945-s-no-gm?authuser=0
          car3 = https://lh3.googleusercontent.com/pw/AP1GczMlyGdGyw0nV6Om0iVF9xfzLn83R_6b5C3pTpb2L77dXJV5W72GO16GnzCnG0p4R_MfOK3VybTBJXlLERhcUjmyofTPauXkB06gXGiMfJ6nFYKq9UhsE8vYnN9y34lq6buNZAndRLdY_Vx3qfhqFxex=w1546-h945-s-no-gm?authuser=0
          couple1 = https://lh3.googleusercontent.com/pw/AP1GczOj3F-V4SvrO5fRuRnq_0WrHeDDijhfv7AoTjWkyp5g_q1z6bdogeBcxuzCJirKRifaS3P9w4UFcWTeZ6-HBfsyRB9kgDA5OyfwKw4AP26i-xzcVJXBpqq2sa4vU1gzInw_cs74JCzp1PjP7dE6iO9g=w630-h945-s-no-gm?authuser=0
          couple2 = https://lh3.googleusercontent.com/pw/AP1GczO0zTqT5d3Qw7Ml72Q95anmRxQ1FaA4x5SyTkAuUXVG8MusAM2XKofuvfZz98AoiP5Y1zl56K3Kuu3JzX5yEkKaTGfmo6ePMo7STWuY08DPGCBHTWxXFRucZ9yNqjteIK0lYbpQqj96B_h8GM79fzMs=w1418-h945-s-no-gm?authuser=0
          couple3 = https://lh3.googleusercontent.com/pw/AP1GczPVfL7m-PO3n69Htai_Uw_iJYeZL8fX1--6GJxvsi-7rA6tTkSbvegl5kr1wj0xYLr0LxpfXd1w0vGzawitdLxBFEMY4df2b1imsnrK7KdrPBaZHZbqzPwBmkfHWplZjQdV3hZedQiuuUFFh-Lm4aWC=w630-h945-s-no-gm?authuser=0
          couple4 = https://lh3.googleusercontent.com/pw/AP1GczNoTP0HmAlt8YaDVF4ib2-QqLjLOLUGCencoKedmg5PSkqW30y04MYA5b8qpweiRKY9jpg-JHmWpC3AKRKVa6Nw9bPDRVLFDzCHFMK7C5Ae6QUsgHjDloZUpxk9mWBe1EMYX0qpqZNmiJHIoSCtjeaQ=w630-h945-s-no-gm?authuser=0
          landscape1 = https://lh3.googleusercontent.com/pw/AP1GczNtowcPB9L7XQSb59UeCqYQdTS-z4Mv2-z3--lsWEIZvpWWZXFtA5mweGRJOJIcTbBRLGZRyBgvd-kZDHT3AwhoFHn4kFHNQKCETBSkwXAVxhAooxKLogYYRDhGav_VkDyvF3W97brJ0qe9L81YvL_L=w1307-h945-s-no-gm?authuser=0
          landscape2 = https://lh3.googleusercontent.com/pw/AP1GczOW14B17y95YDjGNfBd66c83SC0sylkbo5-TQRwjhP3BpbQBotwcVmwII-SrwZaf5JFDPMb3ac8-dDwCq8aZJbVH6LPe-2947wYglz5B-pcdWAGO2goEPyiE223zRxrq2dXBSelXpEmhPfKJySbIjB8=w1295-h945-s-no-gm?authuser=0
          landscape3 = https://lh3.googleusercontent.com/pw/AP1GczMoafC8tr_jERip2xfS8woGqWpMvJzfunRO9ohVjZkGWzSL1Pb2Tlil8Mk2ts3brTW0aqKN2N-zDkFweRx95FOIEwIQEzCY41dbJmqaPjX38ZGC4akrdsTAn_vIdYjfoAyEMugc_620FPE7BUDrcN8v=w1418-h945-s-no-gm?authuser=0
          portrait6 = https://lh3.googleusercontent.com/pw/AP1GczN_prunHMufLMd1ZMpLeY2mOXEyHovjkJz2yyPnbd8r25X4rgFK6ULPGJCunhY4a9Kz8SYwzRVXEbpd8wI174IsCq2AJIeBz3O48MJvgwwz8rGQuzoNkAfs8AM59x1ZhFZuJs5v9mP3Rei4HE-Om3H8=w709-h945-s-no-gm?authuser=0
          portrait7 = https://lh3.googleusercontent.com/pw/AP1GczNCQt2wUb6RkolSepkYdEqVRi21t1PSSvzg4TLOesagXh-Et4kej0-rqg8n_zpfqpgmdFydy5IAkj_Xn2dTfIy1tAs9BTp9F4J5VwidpxfFC1PszWtPJeGqxAic_C893ZKr5I2zTzn9BLwhPCWp8vkr=w656-h945-s-no-gm?authuser=0
          portrait8 = https://lh3.googleusercontent.com/pw/AP1GczOTnAutWal0Ipj3Ng95JuSLxbnrawS3fFZf8ra_1A8REk8tweqm1LGayB1pm1lUiIFWvjZD1NutyRx2I-jrdZRYWOXNQUWjzhFFGOjPnsqLJ0l20RmL5Jrvf3M4eC-_mB14l2bd_Jmr8kKpyBtrUG0v=w630-h945-s-no-gm?authuser=0
          portrait9 = https://lh3.googleusercontent.com/pw/AP1GczP4_I7xsFKA9puPkCFPgLhLRmrgo39F_S12ZlHstgjmiKmj8wPiFdTRLGRAmEN5epZ9HJq4theiFFGHo8wn0YSc5h89QHeaiYp-BjVcNNLkWRRDjBw0tf1uK3no4QTYGhHQVca4utuID5TODEAsB46E=w630-h945-s-no-gm?authuser=0
          portrait10 = https://lh3.googleusercontent.com/pw/AP1GczO-bcA8dZxIkv9eyaULK2MITqF_xbABTI6aB8dNYRjOqn5Kq9HANyhdGG480HESYv0qy-QUibo261rLI9gjHmR961VAKeWCMykE83NVMDA6WDhJEPBzjSwnHHyssvCGEHzcjTDZlynqby9978gcFtZ9=w630-h945-s-no-gm?authuser=0
          
          */}
        </div>
        <Footer />
      </div>




    </main>
  );
}
