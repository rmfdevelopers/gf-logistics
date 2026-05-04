'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Truck, 
  MapPin, 
  Shield, 
  Zap, 
  Globe, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  Menu, 
  X, 
  Instagram, 
  ImageOff,
  Route,
  Clock3,
  Users,
  PackageCheck,
  Building2
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: mono-accent

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1766785368863-f2188a8c8b32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxJbnRyYXN0YXRlJTIwRG9vcnN0ZXAlMjBEZWxpdmVyeSUyMEludGVyc3RhdGUlMjBGcmVpZ2h0JTIwSW50ZXJuYXRpb25hbCUyMFNoaXBwaW5nJTIwbG9naXN0aWNzfGVufDB8MHx8fDE3Nzc5MDM5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1766785368863-f2188a8c8b32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxJbnRyYXN0YXRlJTIwRG9vcnN0ZXAlMjBEZWxpdmVyeSUyMEludGVyc3RhdGUlMjBGcmVpZ2h0JTIwSW50ZXJuYXRpb25hbCUyMFNoaXBwaW5nJTIwbG9naXN0aWNzfGVufDB8MHx8fDE3Nzc5MDM5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ]
};

const brand = {
  name: "G&F Logistics",
  tagline: "Time is money, we save you both",
  description: "Premium logistics and transportation services providing seamless doorstep, ecommerce, and international delivery solutions across borders.",
  industry: "logistics",
  region: "nigeria",
  currency: "₦"
};

const contact = {
  whatsapp: "",
  instagram: "gflogistics.ng",
  email: "",
  address: "Oluyole Extension, Ibadan, Nigeria"
};

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Tracking", href: "#features" },
  { name: "Services", href: "#products" },
  { name: "Our Story", href: "#about" },
  { name: "Dispatch", href: "#contact" }
];

const features = [
  { title: "Real-Time Tracking", description: "Monitor your shipments with precision GPS updates at every milestone.", icon: MapPin },
  { title: "Secure Handling", description: "Our luxury-tier handling ensures goods arrive in pristine condition.", icon: Shield },
  { title: "Express Dispatch", description: "Optimized routing protocols to save you the most valuable asset: time.", icon: Zap },
  { title: "Global Reach", description: "From Ibadan to the world, we bridge the gap in international trade.", icon: Globe }
];

const products = [
  { name: "Intrastate Doorstep Delivery", description: "Swift and secure pickup and delivery within the city limits of Ibadan.", price: "₦3,500" },
  { name: "Interstate Freight", description: "Reliable bulk and parcel transport across all 36 states in Nigeria.", price: "₦12,500" },
  { name: "International Shipping", description: "Global logistics solutions for ecommerce and individual shipments overseas.", price: "₦85,000" },
  { name: "Bulk Haulage Service", description: "Heavy-duty transportation for industrial goods and large-scale ecommerce inventory.", price: "₦250,000" }
];

const steps = [
  { number: "01", title: "Request", description: "Book your delivery via our digital platform or WhatsApp link." },
  { number: "02", title: "Sort & Ship", description: "Your items are categorized and dispatched via our luxury fleet." },
  { number: "03", title: "Arrival", description: "Package delivered to the doorstep with real-time confirmation." }
];

const testimonials = [
  { name: "Oluwaseun Adeyemi", text: "The fastest interstate delivery I have ever used. My bulk goods arrived in Abuja ahead of schedule.", role: "Ecommerce Vendor" },
  { name: "Chinelo Obi", text: "G&F makes international shipping look easy. Their tracking is actually accurate.", role: "Fashion Designer" },
  { name: "Babatunde Lawal", text: "Professional, clean, and efficient. They really respect the 'Time is Money' mantra.", role: "Corporate Client" }
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const FeatureIcon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'MapPin': return <MapPin className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Globe': return <Globe className={className} />;
    default: return <Truck className={className} />;
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const heroReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.15);
  const aboutReveal = useScrollReveal(0.15);
  const processReveal = useScrollReveal(0.15);
  const productsReveal = useScrollReveal(0.15);
  const testimonialsReveal = useScrollReveal(0.15);
  const contactReveal = useScrollReveal(0.15);

  return (
    <main className="relative bg-primary text-white overflow-x-hidden">
      {/* HEADER */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-7'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-heading text-2xl font-black tracking-tighter flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-primary transform group-hover:rotate-12 transition-transform duration-300">G</div>
            <span className="text-white">F LOGISTICS</span>
          </a>

          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium tracking-wide hover:text-accent transition-colors duration-300">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-white px-7 py-3 rounded-full text-sm font-bold hover:brightness-110 hover:scale-105 transition-all">
              Book a Pickup
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div className="font-heading text-xl font-black">G&F LOGISTICS</div>
          <button onClick={() => setMobileMenu(false)}><X size={32} /></button>
        </div>
        <div className="p-10 flex flex-col gap-8 text-2xl font-heading font-bold">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="hover:text-accent transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenu(false)} className="bg-secondary text-white py-5 rounded-xl text-center mt-10">
            Book Pickup
          </a>
        </div>
      </div>

      {/* HERO SECTION - HR-C */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-primary overflow-hidden pt-20 md:pt-0">
        <div className="flex flex-col justify-center px-8 md:px-16 py-24 relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/10 blur-[100px] pointer-events-none" />
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-80 animate-fadeIn">
            Premium Courier {brand.region}
          </p>
          <h1 className={`font-heading text-5xl md:text-[5rem] font-black text-white leading-[0.95] tracking-tighter transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-10'}`} ref={heroReveal.ref as any}>
            Luxury Logistics <br/><span className="text-accent">for the Modern Era.</span>
          </h1>
          <p className="text-white/45 mt-8 text-lg md:text-xl max-w-md leading-relaxed animate-slideUp">
            Time is money, we save you both. Experience the gold standard of delivery with G&F Logistics.
          </p>
          <div className="flex gap-4 mt-12 flex-wrap items-center">
            <a href="#contact" className="bg-accent text-primary px-10 py-5 font-black hover:brightness-110 hover:scale-[1.02] transition-all duration-300 rounded-xl shadow-[0_0_30px_rgba(204,255,0,0.2)]">
              Book a Pickup
            </a>
            <a href="#products" className="text-white border-b border-white/20 pb-1 hover:border-accent hover:text-accent transition-all font-medium ml-4">
              Our Services →
            </a>
          </div>
          <div className="mt-20 grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div>
              <p className="font-heading text-4xl font-black text-white">1400+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Verified Followers</p>
            </div>
            <div>
              <p className="font-heading text-4xl font-black text-white">24/7</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Active Dispatch</p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[400px] md:min-h-full overflow-hidden">
          <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover animate-float" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent md:hidden" />
          <div className="absolute bottom-10 right-10 flex gap-3">
             <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center text-accent">
                <Truck size={20} />
             </div>
             <div className="w-12 h-12 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/30 flex items-center justify-center text-secondary">
                <Globe size={20} />
             </div>
          </div>
        </div>
      </section>

      {/* DIVIDER - D-STAT */}
      <div className="bg-accent py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10 text-center relative z-10">
          <div className="px-8 py-4">
            <p className="text-5xl font-black text-primary tracking-tight">100%</p>
            <p className="text-primary/60 text-sm mt-1 font-bold uppercase tracking-widest">Delivery Success</p>
          </div>
          <div className="px-8 py-4">
            <p className="text-5xl font-black text-primary tracking-tight">Sharp</p>
            <p className="text-primary/60 text-sm mt-1 font-bold uppercase tracking-widest">Delivery Nationwide</p>
          </div>
          <div className="px-8 py-4">
            <p className="text-5xl font-black text-primary tracking-tight">Ibadan</p>
            <p className="text-primary/60 text-sm mt-1 font-bold uppercase tracking-widest">Based, Global reach</p>
          </div>
        </div>
      </div>

      {/* FEATURES - F-BENTO */}
      <section id="features" ref={featuresReveal.ref as any} className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-4">Precision Logistics</h2>
            <p className="text-white/40 text-lg max-w-xl">Why top tier brands trust G&F for their most critical infrastructure needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`md:col-span-2 bg-secondary/5 rounded-3xl p-10 border border-secondary/20 hover:border-secondary/50 transition-all duration-500 flex flex-col justify-between group min-h-[320px] relative overflow-hidden ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
                <FeatureIcon name="Zap" className="text-secondary" />
              </div>
              <div className="relative z-10">
                <h3 className="font-heading text-3xl font-black text-white">Express Dispatch</h3>
                <p className="text-white/50 mt-4 text-lg max-w-md">Optimized routing protocols and dedicated lanes to save you the most valuable asset: time.</p>
              </div>
            </div>
            
            {features.filter(f => f.title !== 'Express Dispatch').map((f, i) => (
              <div key={i} style={{ transitionDelay: `${(i + 1) * 150}ms` }} className={`bg-white/5 rounded-3xl p-10 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 flex flex-col justify-between min-h-[320px] ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FeatureIcon name={f.icon as any} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white leading-tight">{f.title}</h3>
                  <p className="text-white/45 text-sm mt-3 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Horizontal Split (V3) */}
      <section id="about" ref={aboutReveal.ref as any} className="py-32 px-6 bg-secondary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-8">The G&F Standard</h2>
            <div className="space-y-6 text-white/50 text-lg leading-relaxed">
              <p>Based in Oluyole Extension, Ibadan, G&F Logistics has redefined the transportation landscape in Nigeria. We combine speed, safety, and sophisticated service.</p>
              <p>We ensure that whether it is a doorstep parcel or international bulk freight, your delivery is handled with absolute priority and professional care.</p>
            </div>
            <div className="mt-12 flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 w-fit">
              <Building2 className="text-secondary" size={32} />
              <div>
                <p className="text-white font-bold">Headquarters</p>
                <p className="text-white/40 text-sm">Oluyole Extension, Ibadan</p>
              </div>
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="absolute inset-0 border-2 border-accent rounded-3xl translate-x-4 translate-y-4" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.hero} alt="Logistics Flow" fill className="object-cover" />
              <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-primary/80 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-accent font-mono text-xs uppercase tracking-widest mb-1">Our Mission</p>
                <p className="text-white font-bold italic">&ldquo;Sharp delivery, nationwide. No excuses.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS - BONUS */}
      <section ref={processReveal.ref as any} className="py-32 px-6 bg-primary">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-4">Our Workflow</h2>
            <p className="text-white/40 text-lg">How we keep you moving at the speed of business.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent hidden md:block -translate-y-10" />
             {steps.map((step, i) => (
               <div key={i} style={{ transitionDelay: `${i * 200}ms` }} className={`relative z-10 text-center transition-all duration-700 ease-out ${processReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                 <div className="w-20 h-20 rounded-full bg-accent text-primary flex items-center justify-center font-black text-2xl mx-auto mb-8 shadow-[0_0_40px_rgba(204,255,0,0.3)]">
                   {step.number}
                 </div>
                 <h3 className="font-heading text-2xl font-bold text-white mb-3">{step.title}</h3>
                 <p className="text-white/45 leading-relaxed">{step.description}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS / SERVICES - P-LIST */}
      <section id="products" ref={productsReveal.ref as any} className="py-32 px-6 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-4">Service Categories</h2>
            <p className="text-white/40 text-lg">Tailored logistics solutions for every scale of business.</p>
          </div>
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={i} style={{ transitionDelay: `${i * 100}ms` }} className={`group flex flex-col sm:flex-row sm:items-center gap-6 p-8 rounded-3xl border border-white/5 bg-white/2 hover:border-accent/40 hover:bg-accent/5 transition-all duration-500 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="font-heading text-accent/30 text-6xl font-black tracking-tighter w-20 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-white/45 mt-2 text-base max-w-xl">{p.description}</p>
                </div>
                <div className="sm:text-right shrink-0 mt-4 sm:mt-0">
                  <p className="font-black text-2xl text-white">{p.price}</p>
                  <a href="#contact" className="text-xs font-bold text-accent uppercase tracking-widest mt-2 block hover:underline">Enquire Now →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SPOTLIGHT */}
      <section ref={testimonialsReveal.ref as any} className="py-32 px-6 bg-accent/5 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-black text-white mb-20">Client Experiences</h2>
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} style={{ transitionDelay: `${i * 150}ms` }} className={`relative py-12 px-10 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary border border-secondary/50 flex items-center justify-center shadow-lg">
                  <span className="text-primary text-3xl font-black leading-none">&ldquo;</span>
                </div>
                <p className="text-white/80 text-xl md:text-2xl italic leading-relaxed font-light">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xl border border-accent/20">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-accent font-mono text-xs tracking-widest uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C2 */}
      <section id="contact" ref={contactReveal.ref as any} className="relative overflow-hidden py-32 group">
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,40%_100%,0_100%)] transition-all duration-1000 group-hover:[clip-path:polygon(0_0,60%_0,35%_100%,0_100%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none mb-8">
              Move Your <br/>Goods Today
            </h2>
            <div className="space-y-8 mt-12">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Instagram</p>
                    <p className="text-white font-bold">@{contact.instagram}</p>
                  </div>
               </div>
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Location</p>
                    <p className="text-white font-bold">{contact.address}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="w-full max-w-md ml-auto">
            {sent ? (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-primary rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40 relative z-10">
                  <CheckCheck size={32} className="text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-black text-white mb-3 relative z-10">Message Sent</h3>
                <p className="text-white/60 max-w-sm text-lg relative z-10">Sharp. We have received your pickup request and our dispatch team will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 bg-primary p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-bold text-white mb-8">Pickup Booking</h3>
                  <div className="space-y-4">
                    {(['name', 'email', 'phone'] as const).map(field => (
                      <input
                        key={field}
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required={field !== 'phone'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    ))}
                    <textarea 
                      rows={4} 
                      placeholder="Service details (Pickup address, items, destination)"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full mt-8 bg-accent text-primary py-4 rounded-xl font-black text-lg hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <>Book Pickup <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="font-heading text-3xl font-black tracking-tighter flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center text-primary">G</div>
                <span>F LOGISTICS</span>
              </a>
              <p className="text-white/40 text-lg max-w-sm mb-8 leading-relaxed">
                Premium logistics providing the gold standard of delivery from Ibadan to the rest of the world.
              </p>
              <div className="flex gap-4">
                <a href={`https://instagram.com/${contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-8 text-xl">Quick Links</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/40 hover:text-accent transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-8 text-xl">Support</h4>
              <ul className="space-y-4">
                <li><p className="text-white/40">Terms of Service</p></li>
                <li><p className="text-white/40">Privacy Policy</p></li>
                <li><p className="text-white/40">Shipping Guidelines</p></li>
                <li><p className="text-white/40">{contact.address}</p></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-sm font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} G&F LOGISTICS. Sharp delivery, nationwide.
            </p>
            <div className="flex items-center gap-2 text-white/20 text-xs font-mono uppercase tracking-widest">
              <Route size={14} className="text-accent" />
              Tracking Active
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}