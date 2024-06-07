"use client"

import styles from "./collage.module.scss";
import Image from "next/image";
import FsLightbox from "fslightbox-react";
import { useState } from "react";

// new links for images

// const portrait1 = [
// "https://lh3.googleusercontent.com/pw/AP1GczPHnkyLXL4vxNzXb46hECqJb6KNm6ASDzQFoV9zR75MUPBFryiu7Hg1wQX-qYk2jtkIuwdOM0GvjVGmAH_lw-u5I5Hcqti6n8Nq_-AmP8DsdMj5ZudDJklDaK51GO3TnumRcnI4Miflkk7FPcItu1FQ=w630-h945-s-no-gm?authuser=0"
// "https://lh3.googleusercontent.com/pw/AP1GczMy00QzCKXEE_pOlbG-24jnOnjs6jLIShOIx-K_gHN_aw4KBWtWUsHABT1yiLr5vptmeAuNVHDNlBvwutLZuE22cM9MI9856mvL_MC-MKFkxFcQfzFzr_brgG-XMCNfr0cCu4kVm2Z_41MSF6GDOOmp=w611-h945-s-no-gm?authuser=0"
// "https://lh3.googleusercontent.com/pw/AP1GczNtRWeX4I4VoBIzAtsrz3PqSg_pS9niJ7i1y8m-vikAzwwxD4UNU7atC1azqCaD5Euva0cuZc7mlMPWNUdx_GDHd-Z3ESV8sMXCyE2Xbgidpeow36vTEKgpKdmUq7-Go1TTYZpgSLUZKpUXgnunb2_M=w709-h945-s-no-gm?authuser=0"
// "https://lh3.googleusercontent.com/pw/AP1GczP4_I7xsFKA9puPkCFPgLhLRmrgo39F_S12ZlHstgjmiKmj8wPiFdTRLGRAmEN5epZ9HJq4theiFFGHo8wn0YSc5h89QHeaiYp-BjVcNNLkWRRDjBw0tf1uK3no4QTYGhHQVca4utuID5TODEAsB46E=w630-h945-s-no-gm?authuser=0"
//]


// const portrait2 = [
// "https://lh3.googleusercontent.com/pw/AP1GczNkyucx_WIidTWJl1ob80uinEY8ot2eNNf2oLyb_VlxMcNzuEydzpv9225qGTi8wG3CwBKj77UUv7X-ZUNvEBmOmpA8qPZfx-Lq7EyoqrjrbEfHz8ZNXnI5bCb49QEFsozx_Ob00DBjfoYG5cVSkn7P=w630-h945-s-no-gm?authuser=0",
// "https://lh3.googleusercontent.com/pw/AP1GczOTnAutWal0Ipj3Ng95JuSLxbnrawS3fFZf8ra_1A8REk8tweqm1LGayB1pm1lUiIFWvjZD1NutyRx2I-jrdZRYWOXNQUWjzhFFGOjPnsqLJ0l20RmL5Jrvf3M4eC-_mB14l2bd_Jmr8kKpyBtrUG0v=w630-h945-s-no-gm?authuser=0",
// "https://lh3.googleusercontent.com/pw/AP1GczM7mqV0FfFGOtF3kNa3PGrY3rPC7M1fAw-ZcP2hId082fZawGkj3-iGoseVaEICBli6SqO1MMWTGmVO_FYDgV_jP8JG6iih9jRLA-1PA12rhiOwpeehAazji6BXF_u-2s5X1B5mWzjkrqOjW746xp53=w630-h945-s-no-gm?authuser=0"
//]

// const landscape = [
// "https://lh3.googleusercontent.com/pw/AP1GczNtowcPB9L7XQSb59UeCqYQdTS-z4Mv2-z3--lsWEIZvpWWZXFtA5mweGRJOJIcTbBRLGZRyBgvd-kZDHT3AwhoFHn4kFHNQKCETBSkwXAVxhAooxKLogYYRDhGav_VkDyvF3W97brJ0qe9L81YvL_L=w1307-h945-s-no-gm?authuser=0",
// "https://lh3.googleusercontent.com/pw/AP1GczMavytKy8OB6zcb2JYmtHuQ2fG9FE5JUKI709Cm__HI7aItNQamRQ_I8pqX3yJREB9JK-qHrcDueqR5l8_8e73jT2SA2pxGL3BQjtBeeTuxdDQfvOeUzluEJKcBxahB6gqIc2St-WK0pdyZNw9LqBmB=w1535-h945-s-no-gm?authuser=0"
// "https://lh3.googleusercontent.com/pw/AP1GczMoafC8tr_jERip2xfS8woGqWpMvJzfunRO9ohVjZkGWzSL1Pb2Tlil8Mk2ts3brTW0aqKN2N-zDkFweRx95FOIEwIQEzCY41dbJmqaPjX38ZGC4akrdsTAn_vIdYjfoAyEMugc_620FPE7BUDrcN8v=w1418-h945-s-no-gm?authuser=0",
// ]

// const cars = [
// "https://lh3.googleusercontent.com/pw/AP1GczNWMIBFBGpgE8OUB-BPP1Hzf2BDQACWjHy7ogF4X1sZGaz2TdcHCq8ytGR5NdXmOB-mBqbWNwwBO-gNPS0OOJk02_8S27wAqr6SMEF6bqjlV5ktYiIJMwMkPEhoANidLtZVrskiO_UgU27HiIRVIXvB=w1418-h945-s-no-gm?authuser=0",
//  "https://lh3.googleusercontent.com/pw/AP1GczMlyGdGyw0nV6Om0iVF9xfzLn83R_6b5C3pTpb2L77dXJV5W72GO16GnzCnG0p4R_MfOK3VybTBJXlLERhcUjmyofTPauXkB06gXGiMfJ6nFYKq9UhsE8vYnN9y34lq6buNZAndRLdY_Vx3qfhqFxex=w1546-h945-s-no-gm?authuser=0",
//]

// const couples = [
// "https://lh3.googleusercontent.com/pw/AP1GczNoTP0HmAlt8YaDVF4ib2-QqLjLOLUGCencoKedmg5PSkqW30y04MYA5b8qpweiRKY9jpg-JHmWpC3AKRKVa6Nw9bPDRVLFDzCHFMK7C5Ae6QUsgHjDloZUpxk9mWBe1EMYX0qpqZNmiJHIoSCtjeaQ=w630-h945-s-no-gm?authuser=0",
// "https://lh3.googleusercontent.com/pw/AP1GczMQD6ha18HUzVtg9OAWJHV0SWwwIzFE8em82DRo2bawYA4d695FokMW-HDdvS5V1OqI1DIxDK5us9XLsDkVLkLztnuTtnEzfkhuR2y5kN6GTNdSVCeQLbWwTVMv-VtAnIAdkS2TeTUzFj4QBwx3qk_L=w699-h945-s-no-gm?authuser=0"
//  "https://lh3.googleusercontent.com/pw/AP1GczPVfL7m-PO3n69Htai_Uw_iJYeZL8fX1--6GJxvsi-7rA6tTkSbvegl5kr1wj0xYLr0LxpfXd1w0vGzawitdLxBFEMY4df2b1imsnrK7KdrPBaZHZbqzPwBmkfHWplZjQdV3hZedQiuuUFFh-Lm4aWC=w630-h945-s-no-gm?authuser=0",
//  "https://lh3.googleusercontent.com/pw/AP1GczOYqohKEN38KkJOpOIWqZyQNsi-6vMnDmRnFWCs8d99tyBKSdyZ8lNogjVYvszaIysy4F7f1LUGtwe7yhMLwPRNijur-sGib9CNWU4YmA1z-djNy5m3dH7aCAJb-KXL2Aqqj-lnLoCSzHKzR_rhLOYv=w630-h945-s-no-gm?authuser=0",
//]

const portrait1 = [
  "https://lh3.googleusercontent.com/pw/AP1GczPsriI0Xv8HhExQR7s-RbIx5Yz_s5lysXvYqFcvNa3UU5EBTZLjmvADlsnV14Mjhup1UWxcdULDqROaKUDa_SG-VwLUhlAoTK0ldIb5pe3qJ2p_GIixTT51JprU6WsQa2qeC6ifLZbHjup7OwDAZWkK=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczPGDEddnpGUyVm5-vaPGpfVVOHo7JhlCBqlD5rt-xrk4Ju-JbkTo1laQ8eF_xv2C8ZlUp5uadxz1pLfwxAQInwQRoICCKdrFpB0guKSfXpfZAtcPoteXPFHj7NHpQGbHYBRunxFTeCqltYKN8d6xttM=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczPj1oj4f9eY8LOAi-WLFiBbvsyI50sT5WLzS9xittsxPBvcY2V5d0cSd-ssmbzbFIfGQ0ki14zIWn-Swl8giC88R1hG9BZniR0ZDkeIqbThMoI-12_D-I21HGq6gt97v91bmbRZCP6wH69SjxwjqonQ=w709-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczMt9tbgKSNHUB5vitcp2IQTIUe1uYeOy0czUGHBuFa3xLrYtVEfg-NFXdGRc1X-n2PyVr8IcM0bvFN2mlnVhhdmckbeLWzEsH5RYR4P7x9t76JIWTqe0bX5WKMGMC5y4jRAPZthJVPHfIzcH_sh55Zs=w630-h945-s-no-gm?authuser=0",
];

const portrait2 = [
  "https://lh3.googleusercontent.com/pw/AP1GczOP77tFdithxJF3PInUGeBceY4wL3fKsWHpyrPRW5x2muQ7cdxTNq61no7cbMFc5s4pYU48b7tqMH65Bh6P6Kf17YP5q1F3DHVILd8SD_9jCXbDMqjk0PAdtt-5BntX5K_E6nvyet5mO_dydcbZOh-N=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczN4dFtkNypwIIVFNfEDo_luY1gtP6BPdDt3WyJeC8r0mLseZB_eajnPqh5StUhRimYxzBgFQe5nljPTJBoCl50cQcQYatB2KsWj6GK-v93gDNH-Dd9GAk2tYdiKvA3yKj6keid7eIJV_b6wRNYTFBAV=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczNC8k6TA5Ll6RzRg--i2Moz395sB7tcMC_INIfn51y3fb9MxwAgtNk3jhfktbBK91qbuKYKoylxM60xb_azSzcIVwBPUZB0JxtFg10K9N1qb-hr5rzhK6rP-pAEJHJKFDbacCT1pw7sCcdHr1fqp2BC=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczO9xUyCu9dqyU7_RsqphwfH4B52lraTXSLdeZDDlxRoZh-3TFP3_x4JJYxYq0ZdU-PCuBUsg20QOpZaz-V3PnVizNoWxLiYH7QuHsIoyRIMrO3dV95-9FXFsnUGfKai6JQ0WbWNgDQ606680yAW0xUB=w630-h945-s-no-gm?authuser=0",
];

const couples = [
  "https://lh3.googleusercontent.com/pw/AP1GczOj3F-V4SvrO5fRuRnq_0WrHeDDijhfv7AoTjWkyp5g_q1z6bdogeBcxuzCJirKRifaS3P9w4UFcWTeZ6-HBfsyRB9kgDA5OyfwKw4AP26i-xzcVJXBpqq2sa4vU1gzInw_cs74JCzp1PjP7dE6iO9g=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczOYqohKEN38KkJOpOIWqZyQNsi-6vMnDmRnFWCs8d99tyBKSdyZ8lNogjVYvszaIysy4F7f1LUGtwe7yhMLwPRNijur-sGib9CNWU4YmA1z-djNy5m3dH7aCAJb-KXL2Aqqj-lnLoCSzHKzR_rhLOYv=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczPVfL7m-PO3n69Htai_Uw_iJYeZL8fX1--6GJxvsi-7rA6tTkSbvegl5kr1wj0xYLr0LxpfXd1w0vGzawitdLxBFEMY4df2b1imsnrK7KdrPBaZHZbqzPwBmkfHWplZjQdV3hZedQiuuUFFh-Lm4aWC=w630-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczNoTP0HmAlt8YaDVF4ib2-QqLjLOLUGCencoKedmg5PSkqW30y04MYA5b8qpweiRKY9jpg-JHmWpC3AKRKVa6Nw9bPDRVLFDzCHFMK7C5Ae6QUsgHjDloZUpxk9mWBe1EMYX0qpqZNmiJHIoSCtjeaQ=w630-h945-s-no-gm?authuser=0",
];

const cars1 = [
  "https://lh3.googleusercontent.com/pw/AP1GczO-TpavOGk9AExzqcUeysGc1FbZJTHpXPBycS8EVNBPE44WLt6eu7Shn_qI2VwS6Xrl_8nNPZMFrnF9_hfjnv2W8iiX9Ne63BZgUmasItUArm7PFmeRfHTSMD1bxnSnHmJMrT4dEQaRMg-s2g8CHobx=w945-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczOlheyAdD6q3L_Dhy8iynvtyRvo87opVrv9sy68d6gexD7EzjZ1t0Dq4honXySGdpBDniv9brVBPp5wCO9NfXGmAJxeK_QeCF3mfkKCAm5kugnduenoX50TaeXfzh4PXh8rmo3_stqPt39cwROD3HhS=w945-h945-s-no-gm?authuser=0",
];

const cars2 = [
  "https://lh3.googleusercontent.com/pw/AP1GczPeZGybAb_8IyReBHqU8l9C9QM4cLnQCV1UOLPbS4PUClakcDrh5B9ylKjMU5eY-iv8ceR1blSg8QQehVvzq4emYtSjQd3PAohrz59e8vS3EknPnLw4S6Pb1XTJk-o1-UgNSBW9ZyyCnHR2EExtN3O0=w1327-h945-s-no-gm?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczPpIiPAlvMm29Goi4M_VtAMmGinf0HH4gMq-2vN5zL28g_0EEUnZzhxbeRkwk4L17vlF9489InAqiK6shwphwu1HcwvwyT-2BTkHwu1Jc5Sqd4sup7NKASupkfwkoJ84ZOiyKPWlOjU_kih0XtwUoCG=w1418-h945-s-no-gm?authuser=0",
];



export default function Collage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toggler, setToggler] = useState<boolean>(false);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  })

  const allImages = [...portrait1, portrait2, ...couples, ...cars1, ...cars2];

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
    setToggler(!toggler);
    openLightboxSlide(index + 1);
    console.log(index)
  }

  const openLightboxSlide = (num: number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: num
    });
  }


  return (
    <section className={styles.container}>
      <FsLightbox
        toggler={toggler}
        slide={lightboxController.slide}
        sources={allImages}
      />
      <div className={styles.portrait}>
        {portrait1 &&
          portrait1.map((p, id) => (
            <Image src={p} key={p + id} width={355} height={505} alt="Portrait" />
          ))}
      </div>
      <div className={styles.portrait2}>
        {portrait2 &&
          portrait2.map((c, id) => (
            <Image src={c} key={c + id} width={355} height={505} alt="Portrait2" />
          ))}
      </div>
      <div className={styles.couples}>
        {couples &&
          couples.map((c, id) => (
            <Image src={c} key={c + id} width={355} height={505} alt="Couples" />
          ))}
      </div>
      <div className={styles.cars1}>
        {cars1 &&
          cars1.map((l, id) => (
            <Image src={l} key={l + id} width={720} height={330} alt="cars" />
          ))}
      </div>
      <div className={styles.cars2}>
        {cars2 &&
          cars2.map((l, id) => (
            <Image src={l} key={l + id} width={720} height={330} alt="cars" />
          ))}
      </div>
    </section>
  );
}
