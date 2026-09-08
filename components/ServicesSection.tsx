import {FramedImage} from "@/components/FramedImage";
import {ServiceIcon} from "@/components/Icons";
import {Reveal} from "@/components/Reveal";
import {ButtonLink} from "@/components/ButtonLink";
import type {SiteContent} from "@/types/site";
export function ServicesSection({content}:{content:SiteContent['services']}){
return <section className="service-section section-pad" id="services"><Reveal><div className="section-heading" data-scroll-anchor><div><p className="eyebrow">Made for your moment</p><h2 className="section-title">Your story.<br/>Your kind of coverage.</h2></div><p className="body-copy">A quiet portrait session or a room full of people you love. We make space for the moments that matter to you.</p></div></Reveal><div className="service-deck grid gap-8 md:grid-cols-2 xl:grid-cols-4">{content.items.map((service,index)=><Reveal key={service.id} delay={index*70}><article className="service-card group"><div className="relative aspect-[4/5] overflow-hidden"><FramedImage className="collection-photo" src={service.image} alt={service.title} position={service.position} sizes="(max-width:768px) 90vw, (max-width:1280px) 45vw,22vw"/></div><div className="service-copy"><div className="mb-4 flex items-center justify-between"><p className="eyebrow mb-0">0{index+1}</p><span className="h-5 w-5 text-cyan"><ServiceIcon icon={service.icon}/></span></div><h3>{service.title}</h3><p className="body-copy mt-3">{service.description}</p><ButtonLink href="/#booking" className="mt-5">Enquire ↗︎</ButtonLink></div></article></Reveal>)}</div></section>;
}
