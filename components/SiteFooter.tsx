import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { SocialLinks } from "@/components/SocialLinks";
export function SiteFooter({adminLabel="Studio login",adminHref="/admin"}:{adminLabel?:string;adminHref?:string}) {
  return <footer className="site-footer"><div className="footer-invitation"><p className="eyebrow">AJC Media / Vancouver photography</p><h2>Where <em>your</em><br/>next story begins.</h2><ButtonLink href="/#booking">Get in touch</ButtonLink></div><div className="footer-grid">
    <div><Image className="footer-logo" src="/assets/brand/ajc-logo.svg" alt="AJC Media" width={112} height={31}/><p className="body-copy mt-6 max-w-sm">Photography for the moments that become your memories. Vancouver & the Lower Mainland.</p><div className="mt-6"><SocialLinks/></div></div>
    <div className="footer-links"><h3>Explore</h3><Link href="/#experience">The experience</Link><Link href="/#portals">Collections</Link><Link href="/#services">Services</Link><Link href="/#pricing">Pricing</Link><Link href="/#gallery">Gallery</Link><Link href="/#about">About Jayson</Link></div>
    <div className="footer-links"><h3>Let's make something personal</h3><a href="mailto:ajcmedia888@gmail.com">ajcmedia888@gmail.com</a><a href="tel:+17788834378">(778) 883-4378</a><Link href="/#booking">Request availability ↗︎</Link><p className="body-copy mt-5">Vancouver, BC<br/>By appointment<br/>Preview edits within 48 hours</p></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} AJC Media</span><span>Weddings · Portraits · Stories</span><Link href={adminHref}>{adminLabel}</Link></div></footer>;
}
