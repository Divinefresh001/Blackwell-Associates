'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  Home, 
  Users, 
  Globe, 
  Fingerprint, 
  ChevronDown, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Award,
  BookOpen,
  FolderLock,
  ArrowLeft,
  FileText
} from 'lucide-react';

// Structuring Mock Data 
const practiceAreas = [
  {
    id: 'corporate',
    title: 'Corporate Law',
    icon: Building2,
    description: 'Bespoke advisory on high-stakes mergers and acquisitions, cross-border corporate governance, venture capitalization, and enterprise risk management.',
    focusArea: 'M&A, Governance, Antitrust, Restructuring'
  },
  {
    id: 'criminal',
    title: 'Criminal Defense',
    icon: ShieldCheck,
    description: 'Surgical representation in complex federal investigations, regulatory compliance defense, white-collar financial crimes, and high-stakes trials.',
    focusArea: 'White-Collar, Sec Investigations, Appellate'
  },
  {
    id: 'real-estate',
    title: 'Real Estate Law',
    icon: Home,
    description: 'Prestigious advisory on high-value commercial asset portfolios, complex zoning disputes, sophisticated zoning land use, and premium tenancy holdings.',
    focusArea: 'Acquisitions, REITs, Zoning, Premium Lease Escrow'
  },
  {
    id: 'family',
    title: 'Family Law',
    icon: Users,
    description: 'Discreet negotiation and litigation regarding high-asset marital division, global custody representation, private family office trusts, and prenuptial agreements.',
    focusArea: 'Asset Devolution, High-Net-Worth Matrimonial'
  },
  {
    id: 'immigration',
    title: 'Immigration Law',
    icon: Globe,
    description: 'Strategic visa planning, global mobility solutions for executives, elite talent credentials, and high-level corporate immigration framework compliance.',
    focusArea: 'Golden Visas, EB-5 Portfolios, Executive Mobility'
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    icon: Fingerprint,
    description: 'Pioneering security strategies for trade secrets, global trademark defense, licensing audits, and technical patent protection for multi-national innovators.',
    focusArea: 'Patent Safeguards, Trade Secret Audits, Licensing'
  }
];

const stats = [
  { value: '35+', label: 'Years of Elite Legal Legacy' },
  { value: '98.4%', label: 'Federal Trials Successfully Resolved' },
  { value: '$1.4B+', label: 'Total Value Secured for Clients' },
  { value: '24', label: 'Senior Juris Doctors & Partners' }
];

const partners = [
  {
    name: 'Sterling Blackwell, Esq.',
    title: 'Founding Partner & Senior Advocate',
    specialization: 'Federal Litigation & Supreme Court Appeal',
    bio: 'Alumnus of Harvard Law School with over 35 years of high-profile trial experience. Former Advisor to the Federal Judicial Commission and state legal councils.',
    avatar: 'https://placehold.co/400x500/111111/b8952a?font=playfair&text=Sterling+Blackwell'
  },
  {
    name: 'Victoria Sterling-Vance',
    title: 'Managing Partner of Corporate Governance',
    specialization: 'High-Value Mergers, Acquisitions & Antitrust',
    bio: 'Alumnus of Yale Law School. Recognized nationally for orchestrating cross-border tech mergers and navigating complex antitrust litigation structures.',
    avatar: 'https://placehold.co/400x500/111111/b8952a?font=playfair&text=Victoria+Sterling'
  },
  {
    name: 'Marcus Thorne, J.D.',
    title: 'Director of Appellate Advocacy & IP',
    specialization: 'International Patent Disclaimers & Defense',
    bio: 'Alumnus of Columbia Law School. Celebrated for shielding state-level patent systems in iconic high-court battles for top Fortune 50 technology innovators.',
    avatar: 'https://placehold.co/400x500/111111/b8952a?font=playfair&text=Marcus+Thorne'
  }
];

const testimonials = [
  {
    quote: "Blackwell & Associates saved our corporate enterprise from a hostile boardroom seizure with sheer surgical mastery of securities regulations. They don't just advise; they dictate outcomes.",
    stars: 5,
    author: "Alastair Vance",
    role: "CEO of Vance Global Holdings",
    caseType: "Corporate Takeover Defense"
  },
  {
    quote: "My future, my family office reputation, and my liberty were on the line during a federal regulatory dragnet. Their trial team dismantled the prosecution’s timeline within 48 hours. Phenomenal defense counsel.",
    stars: 5,
    author: "Julianne Davenport",
    role: "Proprietor of Davenport Fine Art",
    caseType: "Federal White-Collar Defense"
  },
  {
    quote: "An extraordinary team of experts. They successfully resolved a multijurisdictional luxury real estate portfolio inheritance deadlock. Absolute integrity, absolute prestige.",
    stars: 5,
    author: "Haddon Brooks III",
    role: "Trust Trustee",
    caseType: "High-Asset Real Estate Dispute"
  }
];

const faqs = [
  {
    question: "What should I expect during my initial private consultation?",
    answer: "Your inquiry is routed directly to a senior partner under strict non-disclosure protocol. We conduct a preliminary assessment, outline legal risks, identify tactical leverage points, and define your options with complete attorney-client privilege."
  },
  {
    question: "How does the firm structure its retainer values and billing model?",
    answer: "We offer bespoke retainers optimized for high-complexity disputes, transaction advice, and defense trials. Depending on the scale, we utilize transparent tier-based structures linked directly to priority milestones."
  },
  {
    question: "Does Blackwell & Associates represent international corporate clients?",
    answer: "Yes, we represent premier global enterprises, foreign investment groups, sovereign funds, and high-net-worth foreign nationals navigating complex multi-jurisdictional legal environments and strategic trade issues."
  },
  {
    question: "How is absolute confidentiality protected in high-stakes public litigation?",
    answer: "We deploy secure server architectures, custom communications channels, non-disclosure protocols with external staff, and tactical legal containment filings to deny unneeded disclosure of sensitive matters."
  },
  {
    question: "What is your mobilization capacity for emergency injunctions or federal notices?",
    answer: "We maintain a 24/7 dedicated litigation strike team equipped to prepare, finalize, and file emergency federal motions, temporary restraining orders, or appellate stay holds anywhere in the country with minimal notice."
  }
];

// Interactive Count-Up Component using Intersection Observer
function CountUpMetric({ value, label }: { value: string; label: string }) {
  const [currentDisplay, setCurrentDisplay] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const minObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Separate number from symbols (e.g. "35+", "98.4%", "$1.4B+", "24")
            const numberMatch = value.match(/[\d.]+/);
            if (!numberMatch) {
              setCurrentDisplay(value);
              return;
            }

            const parsedVal = parseFloat(numberMatch[0]);
            const isFloat = numberMatch[0].includes('.');
            const prefix = value.substring(0, value.indexOf(numberMatch[0]));
            const suffix = value.substring(value.indexOf(numberMatch[0]) + numberMatch[0].length);

            let startTimestamp: number | null = null;
            const duration = 2000; // 2 seconds

            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              const currentNum = progress * parsedVal;
              
              const formattedNumber = isFloat 
                ? currentNum.toFixed(1)
                : Math.floor(currentNum).toString();

              setCurrentDisplay(`${prefix}${formattedNumber}${suffix}`);

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCurrentDisplay(value);
              }
            };

            window.requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observerTarget = containerRef.current;
    if (observerTarget) {
      minObserver.observe(observerTarget);
    }

    return () => {
      if (observerTarget) {
        minObserver.unobserve(observerTarget);
      }
    };
  }, [value, hasAnimated]);

  return (
    <div ref={containerRef} className="p-8 bg-[#181818]/90 border border-[#B8952A]/10 flex flex-col justify-center text-center sm:text-left transition-all hover:border-[#B8952A]/35">
      <span className="block font-serif text-4xl sm:text-5xl lg:text-6xl text-[#B8952A] font-bold tracking-tight mb-2">
        {currentDisplay}
      </span>
      <span className="block text-[11px] font-mono tracking-widest uppercase text-gray-400 font-semibold leading-relaxed">
        {label}
      </span>
    </div>
  );
}

export default function HomeView() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Intake Form Multi-step State
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: 'Corporate Law',
    message: ''
  });

  // Splash Screen timer (runs once on load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sticky Navigation scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email) {
        alert('Please fill out the required representative contact information (Name & Email).');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.message) {
        alert('Please provide a brief overview of your case concerns.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setReceiptId(`B-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  const selectPracticeAreaAndScroll = (areaName: string) => {
    setFormData(prev => ({
      ...prev,
      caseType: areaName
    }));
    // Also position user directly at Step 2 to configure details
    setCurrentStep(2);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Dynamic Keyframes injected safely */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); filter: brightness(0.65) saturate(1.1); }
          100% { transform: scale(1); }
        }
        .animate-kenburns {
          animation: kenburns 30s ease-in-out infinite;
        }
        @keyframes gold-slide-line {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
        .animate-gold-underline {
          position: relative;
        }
        .animate-gold-underline::after {
          content: '';
          position: absolute;
          bottom: -12px;
          height: 2px;
          background: #B8952A;
          animation: gold-slide-line 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes pulse-intense {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 149, 42, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 8px rgba(184, 149, 42, 0.25); }
        }
        .animate-pulse-gold {
          animation: pulse-intense 2.5s infinite;
        }
      `}</style>

      {/* 7. Elegant 2-Second Page Load Splash Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center text-center px-4"
          >
            <div className="max-w-md w-full flex flex-col items-center">
              {/* Prestigious Emblem Logo */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 border-2 border-[#B8952A] flex items-center justify-center bg-[#0D3B2E] mb-6 shadow-[0_0_30px_rgba(13,59,46,0.5)]"
              >
                <span className="font-serif font-bold text-2xl text-[#B8952A]">B</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="font-serif text-3xl tracking-[0.25em] text-white font-medium">BLACKWELL</h1>
                <p className="text-[10px] tracking-[0.45em] text-[#B8952A] uppercase font-mono font-bold mt-1">
                  &amp; ASSOCIATES
                </p>
                <div className="mt-8 flex items-center justify-center gap-2">
                  <span className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">ESTABLISHED PRECEDENT</span>
                </div>
              </motion.div>

              {/* Gold Loading Progress Line Animation */}
              <div className="relative w-48 h-[2px] bg-gray-900 mt-6 overflow-hidden rounded-full">
                <motion.div 
                  initial={{ left: '-100%', width: '30%' }}
                  animate={{ left: '100%', width: '40%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 bg-[#B8952A] shadow-[0_0_8px_#B8952A]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#121212] flex flex-col selection:bg-[#B8952A]/30 selection:text-white">
        
        {/* 1. Premium Sticky Navigation Header with Scroll Animation */}
        <header 
          className={`sticky top-0 z-40 transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#121212]/90 backdrop-blur-md border-b border-[#B8952A]/70 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
              : 'bg-[#121212]/95 backdrop-blur-sm border-b border-[#B8952A]/10 py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
            <a href="#" className="flex items-center space-x-3 group" id="logo-branding">
              <div className="w-10 h-10 border border-[#B8952A] flex items-center justify-center bg-[#0D3B2E] transition-all duration-300 group-hover:bg-[#B8952A] group-hover:text-[#121212]">
                <span className="font-serif font-bold text-[#B8952A] group-hover:text-[#121212] transition-colors duration-300">B</span>
              </div>
              <div>
                <span className="block font-serif text-lg tracking-[0.3em] text-white font-medium group-hover:text-[#B8952A] transition-colors">BLACKWELL</span>
                <span className="block text-[9px] tracking-[0.4em] text-[#B8952A] uppercase font-mono font-bold">
                  &amp; ASSOCIATES
                </span>
              </div>
            </a>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-widest uppercase font-mono text-gray-300">
              <a href="#practice-areas" className="hover:text-[#B8952A] transition-colors py-1.5 border-b border-transparent hover:border-[#B8952A]/40">Our Practice</a>
              <a href="#why-choose-us" className="hover:text-[#B8952A] transition-colors py-1.5 border-b border-transparent hover:border-[#B8952A]/40">Why Blackwell</a>
              <a href="#attorneys" className="hover:text-[#B8952A] transition-colors py-1.5 border-b border-transparent hover:border-[#B8952A]/40">Senior Partners</a>
              <a href="#testimonials" className="hover:text-[#B8952A] transition-colors py-1.5 border-b border-transparent hover:border-[#B8952A]/40">Credentials</a>
              <a href="#faqs" className="hover:text-[#B8952A] transition-colors py-1.5 border-b border-transparent hover:border-[#B8952A]/40">FAQs</a>
              <a 
                href="#contact" 
                className="border border-[#B8952A] bg-[#0D3B2E]/40 hover:bg-[#0D3B2E] px-5 py-2.5 text-[#B8952A] hover:text-white transition-all rounded-sm font-semibold tracking-wider"
                id="desktop-header-cta"
              >
                Private Consultation
              </a>
            </nav>

            {/* Mobile toggle button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden text-[#B8952A] hover:text-white p-2"
              aria-label="Toggle navigation drawer"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-[73px] left-0 right-0 z-30 bg-[#121212]/95 backdrop-blur-lg border-b border-[#B8952A]/30 p-6 flex flex-col space-y-4 lg:hidden shadow-2xl"
              id="mobile-navigation-drawer"
            >
              <a 
                href="#practice-areas" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-mono text-gray-300 hover:text-[#B8952A] py-2 border-b border-gray-800"
              >
                Our Practice
              </a>
              <a 
                href="#why-choose-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-mono text-gray-300 hover:text-[#B8952A] py-2 border-b border-gray-800"
              >
                Why Blackwell
              </a>
              <a 
                href="#attorneys" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-mono text-gray-300 hover:text-[#B8952A] py-2 border-b border-gray-800"
              >
                Senior Partners
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-mono text-gray-300 hover:text-[#B8952A] py-2 border-b border-gray-800"
              >
                Credentials
              </a>
              <a 
                href="#faqs" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-mono text-gray-300 hover:text-[#B8952A] py-2 border-b border-gray-800"
              >
                FAQs
              </a>
              <a 
                href="#contact" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentStep(1);
                }}
                className="block text-center border border-[#B8952A] bg-[#0D3B2E] text-[#B8952A] font-mono hover:bg-[#B8952A] hover:text-white py-3 text-xs tracking-widest font-semibold uppercase transition-all"
              >
                Book Private Consultation
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-grow">
          
          {/* 2. Hero Section with Ken Burns background & Animated Underline */}
          <section 
            className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-24 border-b border-[#B8952A]/10 overflow-hidden bg-black"
            id="hero"
          >
            {/* Elegant Ken Burns Background Effect */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden opacity-55">
              <div 
                className="absolute inset-0 w-full h-full bg-radial from-[#0D3B2E]/60 via-[#121212]/95 to-black animate-kenburns"
              />
            </div>

            {/* Supreme gold geometric blueprint to symbolize majestic layout order */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
              <Scale className="w-[600px] h-[600px] text-[#B8952A] stroke-[0.5]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-8">
              
              {/* World Mark Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8 flex items-center justify-center"
              >
                <div className="px-4 py-2 border border-[#B8952A]/45 bg-[#0D3B2E]/50 rounded-full flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B8952A]" />
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-semibold text-[#B8952A]">
                    New York &bull; London &bull; Zurich
                  </span>
                </div>
              </motion.div>

              {/* Headline with dynamic underline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1] mb-10 font-medium animate-gold-underline"
                id="hero-headline"
              >
                Justice. <span className="text-[#B8952A]">Precision.</span> Results.
              </motion.h1>

              {/* Subheadline and summary text */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-12 font-serif font-light leading-relaxed tracking-wide mt-4"
                id="hero-subheadline"
              >
                When representation demands supreme rigor, Blackwell &amp; Associates orchestrates authoritative solutions. We safeguard multi-generational wealth, defend liberty, and resolve high-stakes corporate disputes globally.
              </motion.p>

              {/* Action routes */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                id="hero-ctas"
              >
                <a 
                  href="#contact" 
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-4 bg-[#B8952A] hover:bg-[#d4af37] text-black font-semibold tracking-wider text-xs uppercase transition-all duration-300 flex items-center justify-center gap-2 relative group"
                >
                  Book Consultation
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#practice-areas" 
                  className="px-8 py-4 border border-[#B8952A]/50 bg-[#0D3B2E]/20 hover:bg-[#0D3B2E]/40 text-[#B8952A] hover:text-white font-semibold tracking-wider text-xs uppercase transition-all duration-300"
                >
                  Our Practice Areas
                </a>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#B8952A]/40">
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono">SCROLL TO EVALUATION</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-[#B8952A]/40 to-transparent"></div>
            </div>
          </section>

          {/* Practice Areas Section */}
          <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto" id="practice-areas">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#B8952A] uppercase block mb-3 font-semibold">PRESTIGE DISCIPLINARY STRENGTH</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">Areas of Strategic Excellence</h2>
              <div className="w-16 h-[2px] bg-[#B8952A] mx-auto mt-4"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm mt-4 font-light">
                We specialize in matters where margin for error is absolute zero. Each counselor possesses sector-specific dominance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="practice-areas-grid">
              {practiceAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <motion.div 
                    key={area.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-[#181818] border border-gray-800 hover:border-[#B8952A]/40 p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
                    id={`practice-card-${area.id}`}
                  >
                    {/* Subtle inner dark green hover backlight */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-radial from-[#0D3B2E] to-transparent transition-opacity duration-300 pointer-events-none"></div>

                    <div>
                      {/* Icon container */}
                      <div className="w-12 h-12 bg-[#0D3B2E] border border-[#B8952A]/30 flex items-center justify-center text-[#B8952A] mb-6 group-hover:bg-[#B8952A] group-hover:text-[#121212] transition-all duration-300">
                        <IconComponent size={20} />
                      </div>

                      <h3 className="font-serif text-xl text-white group-hover:text-[#B8952A] transition-colors duration-300 mb-3 font-medium">
                        {area.title}
                      </h3>
                      
                      <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed mb-6 font-light">
                        {area.description}
                      </p>
                    </div>

                    <div>
                      {/* Focal list summary point */}
                      <div className="border-t border-gray-800/80 pt-4 mb-4">
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-gray-500 mb-1">STRATEGIC DEPTH</span>
                        <span className="block text-[11px] text-[#B8952A] font-serif font-medium">{area.focusArea}</span>
                      </div>

                      <button 
                        onClick={() => selectPracticeAreaAndScroll(area.title)}
                        className="text-[#B8952A] hover:text-white text-xs uppercase font-mono tracking-widest flex items-center gap-2 group/btn transition-colors duration-200 mt-2"
                        id={`practice-btn-${area.id}`}
                      >
                        Assess Case Focus
                        <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 3. Stats Section with Count-up animation on Scroll */}
          <section className="bg-gradient-to-b from-[#121212] via-[#0D3B2E]/20 to-[#121212] py-24 border-t border-b border-[#B8952A]/10" id="why-choose-us">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Trust Copy Column */}
                <div className="lg:col-span-5" id="why-choose-us-copy">
                  <span className="font-mono text-[10px] tracking-[0.4em] text-[#B8952A] uppercase block mb-3 font-semibold">FOUNDED ON UNWAVERING TRUST</span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-6">Our Authority is Built Upon Precedent.</h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                    Blackwell &amp; Associates is built for high-stakes adversity. For over three decades, we have provided unparalleled tactical governance during boardroom restructurings, national trade investigations, and complex luxury assets redistribution.
                  </p>
                  
                  {/* Visual Bullet Points */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#B8952A]/10 border border-[#B8952A]/40 rounded-full flex items-center justify-center text-[#B8952A] mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <span className="block text-white text-sm font-serif font-medium">Unrestricted Counsel &amp; Legal Protection</span>
                        <span className="block text-gray-400 text-xs font-light">Our partner roster sits on various policy advisory boards nationally.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#B8952A]/10 border border-[#B8952A]/40 rounded-full flex items-center justify-center text-[#B8952A] mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <span className="block text-white text-sm font-serif font-medium font-medium">Surgical Strategy over Common Action</span>
                        <span className="block text-gray-400 text-xs font-light">We specialize in preempting charges to avoid costly trial exposure entirely.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Metrics Column with Interactive Count-up */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="why-choose-us-metrics">
                  {stats.map((stat, idx) => (
                    <CountUpMetric key={idx} value={stat.value} label={stat.label} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. Attorney Profiles Section with slide-up Bio Overlay on Hover */}
          <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto" id="attorneys">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#B8952A] uppercase block mb-3 font-semibold">THE ROSTER OF PARTNERS</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">Commanding Legal Mindset</h2>
              <div className="w-16 h-[2px] bg-[#B8952A] mx-auto mt-4"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm mt-4 font-light">
                Hover over senior profiles to review brief briefs, bar positions, and specializations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="attorneys-grid">
              {partners.map((partner, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-[#181818] border border-gray-800 hover:border-[#B8952A]/30 overflow-hidden flex flex-col group transition-all relative"
                  id={`attorney-card-${index}`}
                >
                  {/* Portrait Area with slide-up bio overlay on Hover */}
                  <div className="relative aspect-[4/5] w-full bg-[#1A1A1A] overflow-hidden border-b border-[#B8952A]/10">
                    <Image 
                      src={partner.avatar} 
                      alt={partner.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      id={`attorney-img-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
                    
                    {/* Subtle lawyer credential badge */}
                    <div className="absolute top-4 right-4 bg-[#0D3B2E] border border-[#B8952A]/40 px-3 py-1 text-[9px] uppercase font-mono text-[#B8952A] z-10">
                      JD / Senior Partner
                    </div>

                    {/* Short Biography Overlay sliding up on hover */}
                    <div className="absolute inset-0 bg-[#0D3B2E]/95 flex flex-col justify-center p-8 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                      <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#B8952A] mb-2 font-bold">
                        EXECUTIVE SUMMARY &bull; CASE RECORD
                      </span>
                      <h4 className="font-serif text-white text-xl mb-3 font-semibold">{partner.name}</h4>
                      <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-6">
                        {partner.bio}
                      </p>
                      <div className="mt-6 border-t border-[#B8952A]/30 pt-4 flex flex-col items-center">
                        <span className="text-[10px] uppercase font-mono text-[#B8952A] tracking-wider mb-2">APPOINTMENTS INDEX</span>
                        <span className="text-white text-xs font-serif italic">{partner.specialization}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attorney Card Bottom Stats remains visible and anchors card */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="block text-xs font-mono tracking-widest text-[#B8952A] uppercase mb-1">
                        {partner.specialization}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-1">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-gray-400 italic mb-4 font-light">
                        {partner.title}
                      </p>
                    </div>

                    <div className="border-t border-gray-800/80 pt-4 flex justify-between items-center text-[10px] font-mono tracking-wider text-gray-500 mt-2">
                      <span>BAR ADMISSION: NY / FED</span>
                      <span className="text-[#B8952A] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold">
                        HOVER FOR ADMISSION <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="bg-[#151515] py-24 border-t border-b border-[#B8952A]/10" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] tracking-[0.4em] text-[#B8952A] uppercase block mb-3 font-semibold">RECORD OF SATISFACTION</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">Elite Clients. Boundless Trust.</h2>
                <div className="w-16 h-[2px] bg-[#B8952A] mx-auto mt-4"></div>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm mt-4 font-light">
                  Discover what sophisticated corporate developers, generational heirs, and founders write about our unmatched legal posture.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
                {testimonials.map((t, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-[#1A1A1A] border border-gray-800 p-8 flex flex-col justify-between hover:border-[#B8952A]/30 transition-all duration-300 relative"
                    id={`testimonial-card-${idx}`}
                  >
                    <div>
                      {/* Stamp Marker */}
                      <div className="absolute top-8 right-8 text-gray-600 opacity-20 pointer-events-none">
                        <Scale size={42} />
                      </div>

                      <span className="inline-block px-3 py-1 bg-[#0D3B2E]/50 border border-[#B8952A]/20 text-[10px] font-mono tracking-widest text-[#B8952A] uppercase mb-4">
                        {t.caseType}
                      </span>

                      {/* Star Rating Icons */}
                      <div className="flex text-[#B8952A] mb-4">
                        {[...Array(t.stars)].map((_, s) => (
                          <Star key={s} size={14} className="fill-current" />
                        ))}
                      </div>

                      <p className="text-gray-300 text-sm italic font-serif leading-relaxed mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="border-t border-gray-800/80 pt-4 flex items-center justify-between">
                      <div>
                        <span className="block text-white text-sm font-serif">{t.author}</span>
                        <span className="block text-[10px] text-gray-500 font-mono tracking-wide mt-0.5">{t.role}</span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase flex items-center gap-1 font-bold">
                         VERIFIED PRECEDENT
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 px-4 sm:px-8 max-w-4xl mx-auto" id="faqs">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#B8952A] uppercase block mb-3 font-semibold">TRIAL PREPARATION &amp; INTEL</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">Inquiries of Counsel</h2>
              <div className="w-16 h-[2px] bg-[#B8952A] mx-auto mt-4"></div>
              <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm mt-4 font-light">
                Explore essential guidance regarding the logistics of hiring Blackwell &amp; Associates for active state litigation or general compliance defense.
              </p>
            </div>

            <div className="space-y-4" id="faq-accordions">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-[#181818] border border-gray-800 transition-all overflow-hidden"
                    id={`faq-item-${index}`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/20 focus:outline-none group"
                      aria-expanded={isOpen}
                      id={`faq-trigger-${index}`}
                    >
                      <span className="font-serif text-[15px] sm:text-lg text-white group-hover:text-[#B8952A] transition-colors leading-snug pr-4">
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-[#B8952A] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#B8952A] text-black border-[#B8952A]' : ''}`}>
                        <ChevronDown size={14} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 text-xs sm:text-sm text-gray-400 font-light leading-relaxed border-t border-gray-800/50 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5. Case Intake Form with Step 1 of 3 Progress Bar */}
          <section className="bg-gradient-to-t from-[#101010] to-[#151515] py-24 border-t border-[#B8952A]/10" id="contact">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* Form Info Box */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-[#1A1A1A] border border-gray-800 p-8 sm:p-10 relative shadow-xl" id="contact-info">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B8952A]"></div>
                  
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.4em] text-[#B8952A] uppercase block mb-3 font-semibold">SCHEDULE INTAKE SECURELY</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight mb-6">Initiate Strategic Action</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                      Submit your details and legal brief via our priority encrypted ingestion. Our risk managers and senior advocates review cases hourly for swift engagement.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm bg-[#0D3B2E]/40 border border-[#B8952A]/30 flex items-center justify-center text-[#B8952A]">
                          <Phone size={16} />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Global Intake Desk</span>
                          <span className="block text-white text-sm font-serif font-medium">+1 (212) 555-8900</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm bg-[#0D3B2E]/40 border border-[#B8952A]/30 flex items-center justify-center text-[#B8952A]">
                          <Mail size={16} />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Secure Client Operations</span>
                          <span className="block text-white text-sm font-serif font-medium">operations@blackwell-law.com</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm bg-[#0D3B2E]/40 border border-[#B8952A]/30 flex items-center justify-center text-[#B8952A]">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Headquarters Advisory</span>
                          <span className="block text-white text-sm font-serif font-medium">750 Fifth Avenue, 28th Fl, New York, NY 10019</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 mt-12 pt-6 text-[10px] font-mono tracking-wider text-gray-500">
                    <div className="flex items-center gap-2">
                      <FolderLock size={12} className="text-[#B8952A]" />
                      <span>256-BIT ENCRYPTED LEGAL COUNSEL CORRESPONDENCE</span>
                    </div>
                  </div>
                </div>

                {/* Case Intake Interactive 3-Step Form Component */}
                <div className="lg:col-span-7 bg-[#181818] border border-gray-800 p-8 sm:p-10 flex flex-col justify-start relative shadow-2xl" id="contact-form-plate">
                  
                  {/* Progress Header and Indicator */}
                  {!formSubmitted && (
                    <div className="mb-8 border-b border-gray-800 pb-6">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#B8952A] uppercase tracking-[0.2em] mb-4">
                        <span>Intake Progress Map</span>
                        <span className="font-bold">Step {currentStep} of 3</span>
                      </div>
                      
                      {/* Step description headers */}
                      <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-mono uppercase tracking-widest text-gray-500 mb-4">
                        <span className={currentStep >= 1 ? 'text-[#B8952A] font-bold' : ''}>1. Identity</span>
                        <span className={currentStep >= 2 ? 'text-[#B8952A] font-bold' : ''}>2. Strategic Details</span>
                        <span className={currentStep >= 3 ? 'text-[#B8952A] font-bold' : ''}>3. Review Dossier</span>
                      </div>

                      {/* Precise Progress Bar */}
                      <div className="w-full h-[3px] bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#B8952A]"
                          initial={{ width: '33.33%' }}
                          animate={{ 
                            width: currentStep === 1 
                              ? '33.33%' 
                              : currentStep === 2 
                                ? '66.66%' 
                                : '100%' 
                          }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        />
                      </div>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-6">
                        
                        {/* STEP 1: CONTACT IDENTITY */}
                        {currentStep === 1 && (
                          <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <h3 className="font-serif text-xl text-white font-medium mb-2 border-b border-gray-800/50 pb-2">Representative Credentials</h3>
                            
                            <div>
                              <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-2 font-semibold">
                                Full Representative Name *
                              </label>
                              <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Sterling Vance, J.D."
                                className="w-full bg-[#121212] border border-gray-800 focus:border-[#B8952A] outline-none text-white text-sm px-4 py-3 transition-colors rounded-sm"
                                id="input-name"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-2 font-semibold">
                                  Corporate Email Address *
                                </label>
                                <input 
                                  type="email" 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                  placeholder="vance@vanceholdings.com"
                                  className="w-full bg-[#121212] border border-gray-800 focus:border-[#B8952A] outline-none text-white text-sm px-4 py-3 transition-colors rounded-sm"
                                  id="input-email"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-2 font-semibold">
                                  Intake Phone Number
                                </label>
                                <input 
                                  type="tel" 
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="+1 (555) 000-0000"
                                  className="w-full bg-[#121212] border border-gray-800 focus:border-[#B8952A] outline-none text-white text-sm px-4 py-3 transition-colors rounded-sm"
                                  id="input-phone"
                                />
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800/50 flex justify-end">
                              <button 
                                type="button"
                                onClick={nextStep}
                                className="bg-[#B8952A] hover:bg-[#d4af37] text-[#121212] px-6 py-3 text-xs font-mono tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2"
                              >
                                Strategic Details <ArrowRight size={14} />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: CASE STRATEGIC DETAILS */}
                        {currentStep === 2 && (
                          <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <h3 className="font-serif text-xl text-white font-medium mb-2 border-b border-gray-800/50 pb-2">Practice Concern &amp; Overview</h3>
                            
                            <div>
                              <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-2 font-semibold">
                                Practice Concern Focus
                              </label>
                              <select 
                                name="caseType"
                                value={formData.caseType}
                                onChange={handleInputChange}
                                className="w-full bg-[#121212] border border-gray-800 focus:border-[#B8952A] outline-none text-white text-sm px-4 py-3 transition-colors rounded-sm cursor-pointer"
                                id="input-caseType"
                              >
                                <option value="Corporate Law">Corporate Law (Acquisition / M&amp;A)</option>
                                <option value="Criminal Defense">Criminal Defense (Federal / Agency)</option>
                                <option value="Real Estate Law">Real Estate Law (High-Value Commercial)</option>
                                <option value="Family Law">Family Law (Marital Holdings / Office)</option>
                                <option value="Immigration Law">Immigration Law (Mobility / Investment)</option>
                                <option value="Intellectual Property">Intellectual Property (Defense / Copyright / Patents)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-2 font-semibold">
                                Executive Case Brief Overview *
                              </label>
                              <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={5}
                                placeholder="Please provide a concise description of current legal exposure or objective goals..."
                                className="w-full bg-[#121212] border border-gray-800 focus:border-[#B8952A] outline-none text-white text-sm px-4 py-3 transition-colors rounded-sm resize-none"
                                id="input-message"
                              ></textarea>
                            </div>

                            <div className="pt-4 border-t border-gray-800/50 flex justify-between">
                              <button 
                                type="button"
                                onClick={prevStep}
                                className="border border-gray-800 text-gray-400 hover:text-white px-6 py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
                              >
                                <ArrowLeft size={14} /> Back
                              </button>

                              <button 
                                type="button"
                                onClick={nextStep}
                                className="bg-[#B8952A] hover:bg-[#d4af37] text-[#121212] px-6 py-3 text-xs font-mono tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2"
                              >
                                Review Dossier <ArrowRight size={14} />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: DOSSIER VALIDATION & SUBMIT */}
                        {currentStep === 3 && (
                          <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <h3 className="font-serif text-xl text-white font-medium mb-2 border-b border-gray-800/50 pb-2">Dossier Review Verification</h3>
                            
                            <p className="text-xs text-gray-400 leading-relaxed font-light">
                              Please verify your details before submitting to direct secure litigation intake. This brief represents privileged legal advisory request.
                            </p>

                            <div className="bg-[#121212] border border-[#B8952A]/20 p-6 rounded-sm space-y-4">
                              <div className="grid grid-cols-2 gap-4 border-b border-gray-900 pb-3">
                                <div>
                                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">REPRESENTATIVE</span>
                                  <span className="block text-white text-sm font-serif">{formData.name}</span>
                                </div>
                                <div>
                                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">CONCERN FIELD</span>
                                  <span className="block text-white text-sm font-serif text-[#B8952A]">{formData.caseType}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 border-b border-gray-900 pb-3">
                                <div>
                                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">EMAIL</span>
                                  <span className="block text-white text-xs font-mono">{formData.email}</span>
                                </div>
                                <div>
                                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">PHONE</span>
                                  <span className="block text-white text-xs font-mono">{formData.phone || 'N/A'}</span>
                                </div>
                              </div>

                              <div>
                                <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">BRIEF OVERVIEW</span>
                                <p className="text-gray-300 text-xs leading-relaxed italic font-serif">
                                  &ldquo;{formData.message}&rdquo;
                                </p>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800/50 flex justify-between">
                              <button 
                                type="button"
                                onClick={prevStep}
                                className="border border-gray-800 text-gray-400 hover:text-white px-6 py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
                              >
                                <ArrowLeft size={14} /> Back
                              </button>

                              <button 
                                type="submit"
                                className="bg-[#B8952A] hover:bg-[#d4af37] text-[#121212] px-8 py-3 text-xs font-mono tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 relative shadow-[0_0_15px_rgba(184,149,42,0.3)] animate-pulse-gold"
                              >
                                File Privileged Brief <FileText size={14} />
                              </button>
                            </div>
                          </motion.div>
                        )}

                      </form>
                    ) : (
                      <motion.div 
                        key="thank-you"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                        id="consultation-success"
                      >
                        {/* Success Document Visual Emblem */}
                        <div className="w-16 h-16 bg-[#0D3B2E] border border-[#B8952A] flex items-center justify-center text-[#B8952A] mx-auto mb-6">
                          <BookOpen size={28} />
                        </div>

                        <h3 className="font-serif text-3xl text-white mb-3">Transmission Confirmed</h3>
                        <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
                          Thank you, <strong className="text-white">{formData.name}</strong>. Your legal brief has been successfully encrypted and logged in our intake catalog. Case File Receipt ID: <strong className="text-[#B8952A] font-mono">{receiptId}</strong> has been allocated to you.
                        </p>

                        <div className="bg-[#121212] border border-[#B8952A]/20 p-6 rounded-sm text-left max-w-md mx-auto mb-8">
                          <span className="block text-[9px] font-mono tracking-widest uppercase text-gray-500 mb-2 font-semibold">IMMEDIATE STEPS</span>
                          <ul className="text-xs text-gray-300 space-y-2 font-mono">
                            <li className="flex items-start gap-2">
                              <span className="text-[#B8952A] mt-0.5">&bull;</span>
                              <span>Conflicts check initiated on our internal systems.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#B8952A] mt-0.5">&bull;</span>
                              <span>A partner assigned representing <span className="text-[#B8952A]">{formData.caseType}</span> will verify priority in direct contact.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#B8952A] mt-0.5">&bull;</span>
                              <span>A callback requested will execute within 4 transactional hours.</span>
                            </li>
                          </ul>
                        </div>

                        <button 
                          onClick={() => {
                            setFormSubmitted(false);
                            setCurrentStep(1);
                            setFormData({ name: '', email: '', phone: '', caseType: 'Corporate Law', message: '' });
                          }}
                          className="px-6 py-2 border border-[#B8952A]/30 text-[#B8952A] text-[10px] font-mono uppercase hover:bg-[#B8952A] hover:text-[#121212] transition-colors"
                          id="submit-another-consultation"
                        >
                          Submit Another Inquiry
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </section>

        </main>

        {/* Footer Section */}
        <footer className="bg-[#0b0b0b] border-t border-[#B8952A]/15 mt-auto pt-20 pb-10" id="footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-950">
              
              {/* Column 1: Brand details */}
              <div className="lg:col-span-4 space-y-6" id="footer-branding">
                <a href="#" className="flex items-center space-x-3">
                  <div className="w-9 h-9 border border-[#B8952A] flex items-center justify-center bg-[#0D3B2E]">
                    <span className="font-serif font-bold text-[#B8952A] text-sm">B</span>
                  </div>
                  <div>
                    <span className="block font-serif text-base tracking-[0.2em] text-white">BLACKWELL</span>
                    <span className="block text-[8px] tracking-[0.35em] text-[#B8952A] uppercase font-mono">
                      &amp; ASSOCIATES
                    </span>
                  </div>
                </a>
                <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed font-light max-w-sm">
                  Bespoke global advocates specializing in defensive trials, mergers and corporate litigation. Providing absolute clarity during moments of peak complexity.
                </p>
                
                {/* Visual ABA Accredited Seal */}
                <div className="flex items-center gap-3 border border-gray-900 bg-black/40 p-4 rounded-sm" id="bar-association-seal">
                  <div className="w-10 h-10 rounded-full border border-[#B8952A]/30 flex items-center justify-center text-[#B8952A]">
                    <Scale size={18} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-[#B8952A] uppercase font-semibold">ABA ACCREDITED FIRM</span>
                    <span className="block text-[10px] text-gray-500 font-light">Chartered Chapter #35012-NY</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Navigate Quicklinks */}
              <div className="lg:col-span-3 lg:col-start-6 space-y-4" id="footer-practice-links">
                <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                  Areas of Strategic Excellence
                </h4>
                <ul className="text-xs text-gray-400 space-y-3 font-light">
                  <li><a href="#practice-areas" className="hover:text-[#B8952A] transition-colors">&bull; Corporate Law Portfolio</a></li>
                  <li><a href="#practice-areas" className="hover:text-[#B8952A] transition-colors">&bull; White-Collar Federal Advocacy</a></li>
                  <li><a href="#practice-areas" className="hover:text-[#B8952A] transition-colors">&bull; Commercial Asset Escrow</a></li>
                  <li><a href="#practice-areas" className="hover:text-[#B8952A] transition-colors">&bull; Luxury Marital Dissolution</a></li>
                  <li><a href="#practice-areas" className="hover:text-[#B8952A] transition-colors">&bull; Global Talent Mobilization</a></li>
                  <li><a href="#practice-areas" className="hover:text-[#B8952A] transition-colors">&bull; High-Court Trademark Defense</a></li>
                </ul>
              </div>

              {/* Column 3: Global Headquarters details */}
              <div className="lg:col-span-3 space-y-4" id="footer-offices">
                <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                  Global Advisory Chambers
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  <strong>New York Chambers (HQ):</strong><br />
                  750 Fifth Avenue, 28th Floor<br />
                  New York, NY 10019<br />
                  <span className="text-[10px] font-mono text-gray-500">+1 (212) 555-8900</span>
                </p>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  <strong>London Advisory Centre:</strong><br />
                  Savile Row Chambers, Mayfair<br />
                  London, W1S 3PR<br />
                  <span className="text-[10px] font-mono text-gray-500">+44 (20) 7946 0192</span>
                </p>
              </div>

            </div>

            {/* Legal Bar Badge & Disclaimer copyrights block */}
            <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-600 font-mono" id="post-footer">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <span className="block mb-1 font-semibold">&copy; 2026 Blackwell &amp; Associates LLP. All rights reserved.</span>
                <span className="block text-[10px] text-gray-700 leading-normal max-w-2xl font-light">
                  Attorney Advertising. High-stakes previous outcomes do not guarantee similar results in active trials. All correspondence via this portal is protected under Federal Rule of Evidence 408.
                </span>
              </div>

              {/* Top scroll trigger */}
              <div className="flex space-x-4">
                <a href="#logo-branding" className="hover:text-[#B8952A] transition-all uppercase tracking-widest font-semibold flex items-center gap-1">
                  TOP OF CHANCERY
                  <span className="inline-block translate-y-[-1px]">&uarr;</span>
                </a>
              </div>
            </div>

          </div>
        </footer>

        {/* 6. Floating "Book Consultation" Interactive Button in Bottom-Right Corner */}
        <motion.div 
          className="fixed bottom-6 right-6 z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.8 : 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <a 
            href="#contact"
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-2 bg-[#B8952A] text-black hover:bg-[#d4af37] px-5 py-3.5 shadow-2xl transition-all duration-300 font-mono text-xs tracking-wider uppercase font-bold rounded-sm animate-pulse-gold group"
            id="floating-book-cta"
          >
            <Briefcase size={14} className="group-hover:rotate-12 transition-transform" />
            <span>Book Consultation</span>
          </a>
        </motion.div>

      </div>
    </>
  );
}
