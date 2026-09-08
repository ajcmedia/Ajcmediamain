"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const [isOpen,setIsOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const pathname=usePathname();
  useEffect(()=>{const sync=()=>setScrolled(window.scrollY>40);sync();window.addEventListener("scroll",sync,{passive:true});return()=>window.removeEventListener("scroll",sync);},[]);
  const toggleRef=useRef<HTMLButtonElement>(null);
  const navRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    const query=window.matchMedia('(min-width: 1024px)');
    const resize=()=>{if(query.matches)setIsOpen(false);};
    query.addEventListener('change',resize);
    return ()=>query.removeEventListener('change',resize);
  },[]);
  useEffect(()=>{
    if(!isOpen)return;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){setIsOpen(false);toggleRef.current?.focus();}
      if(event.key==='Tab'){
        const links=Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>('a')||[]);
        const first=toggleRef.current;const last=links[links.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    window.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow=oldOverflow;window.removeEventListener('keydown',onKey);};
  },[isOpen]);
  return <header className="site-header" data-over-hero={pathname === "/" && !scrolled && !isOpen}>
    <Link href="/" className="site-brand" aria-label="AJC Media home"><span className="beige-wordmark">ajc<span>MEDIA</span></span></Link>
    <button ref={toggleRef} type="button" className="menu-toggle" aria-expanded={isOpen} aria-controls="site-navigation" aria-label={isOpen?'Close navigation':'Open navigation'} onClick={()=>setIsOpen(value=>!value)}><span/><span/></button>
    <nav ref={navRef} id="site-navigation" className="site-nav" data-open={isOpen} aria-label="Main navigation">
      {navItems.map(item=><Link key={item.href} href={item.href} onClick={()=>setIsOpen(false)}>{item.label}</Link>)}
      <Link className="nav-admin" href="/admin" onClick={()=>setIsOpen(false)}>Studio login</Link>
    </nav>
  </header>;
}
