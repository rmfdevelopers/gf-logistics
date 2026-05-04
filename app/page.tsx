'use client';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: oversized

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Truck, 
  Package, 
  Globe, 
  MapPin, 
  Zap, 
  Instagram, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ArrowRight, 
  Loader2, 
  CheckCheck,
  ImageOff
} from 'lucide-react';

// --- Types ---
type Product = { name: string; description: string; price: string; image_url: string };
type Feature = { title: string; description: string; icon: any };
type Testimonial = { name: string; text: string; role: string };

// --- Brand Data ---
const BRAND = {
  name: "G&F Logistics",
  tagline: "Time is money, we save you both",
  description: "Premium logistics and transportation specialists offering seamless doorstep, ecommerce, interstate, and international delivery solutions from the heart of Ibadan.",
  industry: "logistics",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1626446644149-92e5039b74f0?q=80&w=2000",
  products: [
    "https://images.unsplash.com/photo-1659353741484-314fb43eabb5?q=80&w=1000",
    "https://images.unsplash.com/photo-1508053751937-80506404c3f6?q=80&w=1000",
    "https://images.unsplash.com/photo-1754388088242-9444d5d66710?q=80&w=1000",
    "https://images.unsplash.com/photo-1745659655868-d1841f6b1eba?q=80&w=1000"
  ]
};

const FEATURES: Feature[] = [
  { title: "Rapid Dispatch", description: "Optimized routing ensures your items spend less time on the road.", icon: Zap },
  { title: "Bulk Handling", description: "Specialized equipment and vehicles for large-scale cargo and inventory.", icon: Package },
  { title: "Global Reach", description: "Air and sea freight options for your international shipping needs.", icon: Globe },
  { title: "Real-time Tracking", description: "Complete transparency with status updates from pickup to drop-off.", icon: MapPin }
];

const PRODUCTS: Product[] = [
  { name: "Local Doorstep Delivery", description: "Swift and secure package delivery across Ibadan within 2-4 hours.", price: "₦2,500", image_url: IMAGES.products[0] },
  { name: "Interstate Freight", description: "Door-to-door bulk and parcel shipping across all 36 Nigerian states.", price: "₦12,500", image_url: IMAGES.products[1] },
  { name: "International Shipping", description: "Fast-tracked global logistics connecting your business to the world.", price: "₦55,000", image_url: IMAGES.products[2] },
  { name: "Ecommerce Fulfillment", description: "Dedicated dispatch solutions for online vendors and bulk sellers.", price: "₦3,500", image_url: IMAGES.products[3] }
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Bolanle Adeyemi", text: "G&F is the only service I trust for my boutique's interstate orders. Always on time!", role: "Fashion Vendor" },
  { name: "Chukwudi Okafor", text: "The international shipping was smoother than I expected. No hidden charges.", role: "Business Owner" },
  { name: "Tunde Bakare", text: "Best dispatch riders in Ibadan. They actually know the routes and handle packages with care.", role: "Frequent Customer" }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-zinc-700" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined}
      className={className} priority={priority} onError={() => setError(true)} />
  );
}

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-secondary text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-4 ${isScrolled ? 'bg-secondary/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="relative group">
            <span className="font-heading text-2xl font-black tracking-tighter text-white">
              G&F<span className="text-primary">.</span>LOGISTICS
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Services', 'About', 'Process', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-secondary px-6 py-2.5 rounded-full font-black text-sm hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20">
              BOOK A DELIVERY
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white p-2">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[200] transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-secondary border-l border-white/10 p-10 transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => setIsMenuOpen(false)} className="self-end text-white/50 hover:text-white transition-colors mb-12">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Services', 'About', 'Process', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="font-heading text-4xl font-black text-white hover:text-primary transition-colors uppercase tracking-tighter">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto space-y-6">
            <p className="text-white/40 text-sm font-mono uppercase tracking-[0.2em]">Contact Us</p>
            <p className="text-primary font-bold">2348065029689</p>
            <p className="text-white/60 text-sm">Oluyole Extension, Ibadan</p>
          </div>
        </div>
      </div>

      {/* Hero Section (HR-B Pattern) */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="G&F Logistics Hub" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent" />
        <div className="relative z-10 max-w-5xl">
          <div className="mb-6 animate-slideUp">
             <span className="bg-primary text-secondary px-4 py-1.5 font-black text-xs uppercase tracking-widest rounded-sm">
               Sharp delivery, nationwide
             </span>
          </div>
          <h1 className="font-heading text-7xl md:text-[9vw] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            TIME IS MONEY, <br />
            <span className="text-primary">WE SAVE YOU BOTH</span>
          </h1>
          <p className="text-white/60 mt-8 text-lg md:text-xl max-w-2xl leading-relaxed font-medium animate-fadeIn delay-300">
            The sharpest logistics partner in Ibadan. From Oluyole Extension to the rest of the world, we deliver precision at the speed of business.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12 animate-fadeIn delay-500">
            <a href="#contact" className="bg-primary text-secondary px-10 py-5 font-black text-lg hover:bg-accent transition-all hover:scale-[1.02] active:scale-95 text-center shadow-xl shadow-primary/20">
              BOOK A DELIVERY
            </a>
            <a href="#services" className="border border-white/20 text-white px-10 py-5 font-black text-lg hover:bg-white/5 transition-all text-center">
              OUR SERVICES
            </a>
          </div>
        </div>
      </section>

      {/* Features Section (F-ICON-GRID) */}
      <section id="features" className="py-28 px-6 bg-secondary relative">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-end">
            <div>
              <p className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-4">Core Strengths</p>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none uppercase">Why Choose G&F?</h2>
            </div>
            <p className="text-white/40 text-lg max-w-md md:text-right">Bold solutions for modern transportation challenges. We move while others are still planning.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const IconComp = f.icon;
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref as any} 
                  className={`p-10 rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors" />
                  <div className="mb-8 text-primary group-hover:scale-110 transition-transform duration-300">
                    <IconComp size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white mb-4 uppercase tracking-tight">{f.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.products[3]} alt="Warehouse Operations" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary p-12 hidden lg:block rounded-2xl shadow-2xl animate-float">
              <p className="font-heading text-6xl font-black text-secondary">24/7</p>
              <p className="text-secondary/70 font-bold uppercase text-xs tracking-widest mt-2">Always on the move</p>
            </div>
          </div>
          <div>
            <p className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-4">The Ibadan Standard</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase mb-8">Rooted in Ibadan,<br/><span className="text-transparent border-t-2 border-primary/20">Shipping Globally</span></h2>
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Based in Oluyole Extension, G&F Logistics was founded on the principle that delivery should be seamless. We bridge the gap between businesses and customers with a fleet that never sleeps and a team that values your time as much as you do.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
               <div>
                  <p className="text-4xl font-black text-white font-heading">25k+</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1 font-bold">Successful Deliveries</p>
               </div>
               <div>
                  <p className="text-4xl font-black text-white font-heading">1400+</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1 font-bold">Vendor Partners</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider D-STAT */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-secondary/10 text-center">
          {[
            { number: '100%', label: 'Transit Security' },
            { number: '2h Avg', label: 'Local Pickup Time' },
            { number: '36', label: 'States Covered' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-6">
              <p className="text-5xl font-black text-secondary tracking-tighter font-heading">{s.number}</p>
              <p className="text-secondary/60 text-sm mt-2 font-black uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Process Section */}
      <section id="process" className="py-28 px-6 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-6xl font-black text-white uppercase italic tracking-tighter">How We Move</h2>
            <div className="w-24 h-2 bg-primary mx-auto mt-6" />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block -translate-x-1/2" />
            <div className="space-y-16">
              {[
                { n: "01", t: "Request Pickup", d: "Contact us via WhatsApp or phone. Tell us where, what, and when. Our system allocates the nearest dispatch rider instantly." },
                { n: "02", t: "Secure Sorting", d: "Items are tracked and tagged at our Oluyole hub. For interstate or international orders, we handle all customs and transit documentation." },
                { n: "03", t: "Final Delivery", d: "Real-time updates keep you informed. Our team ensures a safe, signature-verified delivery directly to the doorstep." }
              ].map((step, i) => {
                const { ref, isVisible } = useScrollReveal();
                return (
                  <div key={i} ref={ref as any} className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className="lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right">
                      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 ' + (i % 2 === 0 ? '-translate-x-20' : 'translate-x-20')}`}>
                        <span className="text-primary font-heading text-8xl font-black opacity-30 select-none">{step.n}</span>
                        <h3 className="text-3xl font-black text-white uppercase mt-[-40px] relative z-10">{step.t}</h3>
                        <p className="text-white/50 mt-4 max-w-sm ml-auto">{step.d}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary border-4 border-secondary flex items-center justify-center z-10 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    </div>
                    <div className="lg:w-1/2 hidden lg:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Products/Services Section (P-STAGGER) */}
      <section id="services" className="py-28 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center">
            <p className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-4">Service Catalog</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase">Our Offerings</h2>
          </div>
          {PRODUCTS.map((p, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div key={i} ref={ref as any} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                <div className={`w-full lg:w-1/2 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                  <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-2xl group">
                    <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-full h-full bg-primary/10 rounded-2xl -z-10`} />
                </div>
                <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? 'text-left' : 'lg:text-right'} transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <span className="font-mono text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">0{i+1} — {BRAND.industry}</span>
                  <h3 className="font-heading text-4xl md:text-5xl font-black text-white leading-tight uppercase mb-6 italic">{p.name}</h3>
                  <p className="text-white/50 mt-5 text-lg leading-relaxed mb-8">{p.description}</p>
                  <div className={`flex items-baseline gap-4 mb-10 ${i % 2 === 0 ? 'justify-start' : 'lg:justify-end'}`}>
                    <span className="text-sm text-white/40 font-bold uppercase tracking-widest">Starting at</span>
                    <span className="text-4xl font-black text-white">{p.price}</span>
                  </div>
                  <a href="#contact" className="inline-block bg-white text-secondary px-10 py-4 font-black hover:bg-primary transition-all rounded-sm uppercase tracking-tighter">
                    Request Quote
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials (T-SLIDER) */}
      <section className="py-28 bg-secondary overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex items-end justify-between">
          <div>
            <p className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-4">Proof of Work</p>
            <h2 className="font-heading text-5xl font-black text-white uppercase italic tracking-tighter">What Our Clients Say</h2>
          </div>
          <div className="hidden lg:flex gap-4">
            <div className="w-12 h-px bg-white/20 self-center" />
            <span className="text-white/40 font-mono text-xs uppercase tracking-widest">Global Feedback</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-[200%] gap-8 animate-slide-left hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-zinc-900 border border-white/5 p-12 rounded-lg relative group transition-colors hover:border-primary/20">
                <div className="absolute top-0 left-0 w-2 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                <div className="flex gap-1 mb-8">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 bg-primary/40 rounded-full" />)}
                </div>
                <p className="text-white/80 text-xl leading-relaxed italic mb-10 font-medium">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-black text-white uppercase tracking-tighter text-lg">{t.name}</p>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (C4 Pattern) */}
      <section id="contact" className="py-32 px-6 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-heading text-7xl md:text-[8vw] font-black leading-[0.8] uppercase mb-12 tracking-tighter">
              Start <br/>Shipping <br/>Today
            </h2>
            <div className="space-y-8 border-l-8 border-secondary/20 pl-8">
              <div className="group">
                <p className="text-secondary/60 text-xs font-black uppercase tracking-[0.3em] mb-1">WhatsApp Us</p>
                <p className="text-3xl md:text-4xl font-black hover:translate-x-2 transition-transform cursor-pointer">2348065029689</p>
              </div>
              <div className="group">
                <p className="text-secondary/60 text-xs font-black uppercase tracking-[0.3em] mb-1">Visit Hub</p>
                <p className="text-2xl md:text-3xl font-black">Oluyole Extension, Ibadan</p>
              </div>
              <div className="group">
                <p className="text-secondary/60 text-xs font-black uppercase tracking-[0.3em] mb-1">Instagram</p>
                <p className="text-2xl md:text-3xl font-black">@gflogistics.ng</p>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-secondary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-12 border-b border-white/5">
            <div>
              <span className="font-heading text-3xl font-black tracking-tighter text-white">G&F<span className="text-primary">.</span>LOGISTICS</span>
              <p className="text-white/40 mt-4 text-sm max-w-xs font-medium">Time is money, we save you both. The sharpest logistics experience in the West.</p>
            </div>
            <div className="flex gap-6">
              {[Instagram, Phone, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 text-white/30 text-xs font-mono uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} G&F LOGISTICS SPECIALISTS. ALL RIGHTS RESERVED.</p>
            <p>Ibadan, Nigeria</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-secondary rounded-3xl border border-secondary/10 shadow-2xl relative overflow-hidden text-white">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/40">
          <CheckCheck size={40} className="text-primary" />
        </div>
        <h3 className="font-heading text-4xl font-black mb-4 uppercase tracking-tighter">Request Received</h3>
        <p className="text-white/60 max-w-sm text-lg font-medium italic">Our dispatch coordinator will reach out via WhatsApp or call within 15 minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-secondary p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-black text-white mb-10 uppercase italic tracking-tighter">Delivery Request</h3>
        <div className="space-y-4">
          {[
            { id: 'name', type: 'text', label: 'Full Name' },
            { id: 'phone', type: 'text', label: 'WhatsApp Number' },
            { id: 'email', type: 'email', label: 'Email Address' }
          ].map(field => (
            <div key={field.id} className="relative">
              <input
                type={field.type}
                placeholder={field.label}
                value={(form as any)[field.id]}
                onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                required={field.id !== 'email'}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg px-6 py-4 text-white placeholder-white/30 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
          <div className="relative">
            <textarea 
              rows={4} 
              placeholder="Package Details & Delivery Address"
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-6 py-4 text-white placeholder-white/30 text-sm outline-none resize-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-primary text-secondary py-5 rounded-lg font-black text-lg hover:bg-accent transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group uppercase tracking-tighter">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={24} /> Processing Request...
            </span>
          ) : (
            <>
              Confirm Booking <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}