import React, { useState } from 'react';
import {
  Wrench, Car, Calendar, ShoppingCart, Key, Shield, Battery,
  PillBottle, Fan, Wind, Thermometer, Gauge, AlertTriangle,
  CheckCircle, Clock, Phone, MapPin, Star, ArrowRight, Search,
  Settings, Package, Truck, CreditCard, Users, ClipboardList,
  Sparkles, Toolbox, CarFront, CarTaxiFront, Droplets, AirVent,
  Cable, CircleDot, Zap, BatteryCharging, Microscope, ScanLine,
  CalendarDays, Heart, ShieldCheck, Award, X, ChevronRight,
  SearchCheckIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: 'all', name: 'All Services', icon: <Package size={16} /> },
    { id: 'repair', name: 'Repairs', icon: <Wrench size={16} /> },
    { id: 'maintenance', name: 'Maintenance', icon: <Settings size={16} /> },
    { id: 'diagnostic', name: 'Diagnostics', icon: <Microscope size={16} /> },
    { id: 'parts', name: 'Parts', icon: <ShoppingCart size={16} /> },
    { id: 'rental', name: 'Rental', icon: <CarTaxiFront size={16} /> },
    { id: 'detailing', name: 'Detailing', icon: <Sparkles size={16} /> },
  ];

  const services = [
    { id: 1, name: "Engine Repair & Rebuild", category: "repair", description: "Complete engine diagnostics, repair, and rebuilding services for all makes and models.", price: "From ₦150,000", duration: "2-5 days", icon: <Wrench size={22} />, features: ["Compression testing", "Piston ring replacement", "Valve adjustment", "Timing belt/chain replacement"], popular: true },
    { id: 2, name: "Transmission Repair", category: "repair", description: "Automatic and manual transmission repair, rebuild, and replacement services.", price: "From ₦200,000", duration: "3-7 days", icon: <Settings size={22} />, features: ["Gearbox overhaul", "Clutch replacement", "Fluid flush", "Solenoid repair"], popular: true },
    { id: 3, name: "Brake System Service", category: "repair", description: "Complete brake inspection, pad replacement, rotor resurfacing, and caliper repair.", price: "From ₦50,000", duration: "2-4 hours", icon: <Cable size={22} />, features: ["Brake pad replacement", "Rotor resurfacing", "Brake fluid flush", "ABS diagnostics"], popular: false },
    { id: 4, name: "Electrical System Repair", category: "repair", description: "Diagnostic and repair of all electrical components including wiring, alternator, and starter.", price: "From ₦80,000", duration: "1-3 days", icon: <Zap size={22} />, features: ["Alternator repair", "Starter replacement", "Wiring harness repair", "Sensor diagnostics"], popular: false },
    { id: 5, name: "Air Conditioning Service", category: "repair", description: "AC system inspection, leak detection, gas refill, and component replacement.", price: "From ₦40,000", duration: "2-3 hours", icon: <Wind size={22} />, features: ["Gas refill", "Leak detection", "Compressor repair", "Filter replacement"], popular: true },
    { id: 6, name: "Suspension & Steering", category: "repair", description: "Shock absorber replacement, wheel alignment, and steering system repair.", price: "From ₦70,000", duration: "1-2 days", icon: <CircleDot size={22} />, features: ["Shock replacement", "Wheel alignment", "Tie rod repair", "Ball joint replacement"], popular: false },
    { id: 7, name: "Oil Change & Lube", category: "maintenance", description: "Full synthetic or conventional oil change with filter replacement and multi-point inspection.", price: "From ₦25,000", duration: "30-45 min", icon: <PillBottle size={22} />, features: ["Oil filter replacement", "Fluid top-up", "Tire pressure check", "Battery test"], popular: true },
    { id: 8, name: "Tire Rotation & Balance", category: "maintenance", description: "Professional tire rotation, balancing, and pressure check for even wear.", price: "From ₦15,000", duration: "1 hour", icon: <CircleDot size={22} />, features: ["Tire rotation", "Wheel balancing", "Pressure check", "Tread depth measurement"], popular: false },
    { id: 9, name: "Regular Maintenance Package", category: "maintenance", description: "Complete vehicle maintenance including oil change, filter replacements, and full inspection.", price: "From ₦80,000", duration: "2-3 hours", icon: <ClipboardList size={22} />, features: ["Oil & filter change", "Air filter replacement", "Spark plug check", "Brake inspection", "Fluid top-ups"], popular: true },
    { id: 10, name: "Timing Belt Replacement", category: "maintenance", description: "Timing belt inspection and replacement according to manufacturer specifications.", price: "From ₦120,000", duration: "1 day", icon: <Toolbox size={22} />, features: ["Timing belt replacement", "Tensioner check", "Water pump inspection", "System timing adjustment"], popular: false },
    { id: 11, name: "Fluid Service Package", category: "maintenance", description: "Complete fluid change including coolant, brake fluid, transmission fluid, and power steering.", price: "From ₦60,000", duration: "2 hours", icon: <Droplets size={22} />, features: ["Coolant flush", "Brake fluid change", "Transmission service", "Power steering flush"], popular: false },
    { id: 12, name: "Computer Diagnostics", category: "diagnostic", description: "Advanced OBD2 scanning and computer diagnostics to identify check engine lights and issues.", price: "From ₦20,000", duration: "30-60 min", icon: <ScanLine size={22} />, features: ["OBD2 scanning", "Error code reading", "System analysis", "Diagnostic report"], popular: true },
    { id: 13, name: "Engine Performance Test", category: "diagnostic", description: "Comprehensive engine performance analysis including compression and leak-down tests.", price: "From ₦35,000", duration: "1-2 hours", icon: <Gauge size={22} />, features: ["Compression test", "Leak-down test", "Power balance test", "Emissions testing"], popular: false },
    { id: 14, name: "Pre-Purchase Inspection", category: "diagnostic", description: "Thorough vehicle inspection before purchase to identify potential issues.", price: "From ₦50,000", duration: "2-3 hours", icon: <Microscope size={22} />, features: ["Full mechanical inspection", "Body condition check", "Test drive", "Detailed report"], popular: true },
    { id: 15, name: "Battery & Charging Test", category: "diagnostic", description: "Complete battery health check and charging system analysis.", price: "From ₦10,000", duration: "30 min", icon: <BatteryCharging size={22} />, features: ["Battery load test", "Alternator test", "Starter test", "Electrical system check"], popular: false },
    { id: 16, name: "Brake Pads & Rotors", category: "parts", description: "Quality brake pad and rotor replacement with genuine or OEM parts.", price: "From ₦60,000", duration: "2-3 hours", icon: <ShoppingCart size={22} />, features: ["Brake pad replacement", "Rotor replacement", "Caliper inspection", "Brake bleed"], popular: true },
    { id: 17, name: "Battery Replacement", category: "parts", description: "Battery replacement with warranty and proper disposal of old battery.", price: "From ₦45,000", duration: "30 min", icon: <Battery size={22} />, features: ["Battery replacement", "Terminal cleaning", "System reset", "Old battery disposal"], popular: false },
    { id: 18, name: "Shock Absorbers Replacement", category: "parts", description: "Quality shock absorber replacement for improved ride comfort and handling.", price: "From ₦80,000", duration: "2-4 hours", icon: <Car size={22} />, features: ["Shock replacement", "Strut replacement", "Mount inspection", "Wheel alignment"], popular: false },
    { id: 19, name: "Alternator & Starter", category: "parts", description: "Alternator and starter replacement with quality new or refurbished units.", price: "From ₦70,000", duration: "2-3 hours", icon: <Zap size={22} />, features: ["Alternator replacement", "Starter replacement", "System testing", "Warranty included"], popular: false },
    { id: 20, name: "Daily Car Rental", category: "rental", description: "Short-term vehicle rental for daily needs, business trips, or special occasions.", price: "From ₦25,000/day", duration: "Flexible", icon: <CarTaxiFront size={22} />, features: ["Full insurance", "24/7 support", "Free delivery", "Unlimited mileage options"], popular: true },
    { id: 21, name: "Monthly Subscription", category: "rental", description: "Long-term vehicle subscription with maintenance and insurance included.", price: "From ₦400,000/mo", duration: "Monthly", icon: <Calendar size={22} />, features: ["Maintenance included", "Insurance coverage", "Roadside assistance", "Vehicle swap option"], popular: true },
    { id: 22, name: "Luxury Car Rental", category: "rental", description: "Premium luxury vehicles for weddings, events, and special occasions.", price: "From ₦100,000/day", duration: "Daily", icon: <CarFront size={22} />, features: ["Premium models", "Chauffeur option", "Event ready", "Concierge service"], popular: false },
    { id: 23, name: "SUV & 4x4 Rental", category: "rental", description: "SUV and 4x4 vehicles perfect for family trips and off-road adventures.", price: "From ₦45,000/day", duration: "Flexible", icon: <Truck size={22} />, features: ["4x4 capabilities", "Spacious interior", "Roof rack available", "GPS included"], popular: false },
    { id: 24, name: "Exterior Detailing", category: "detailing", description: "Complete exterior cleaning, polishing, and waxing for a showroom finish.", price: "From ₦40,000", duration: "3-4 hours", icon: <Sparkles size={22} />, features: ["Hand wash", "Clay bar treatment", "Machine polish", "Wax sealant", "Tire dressing"], popular: true },
    { id: 25, name: "Interior Detailing", category: "detailing", description: "Deep cleaning of interior including upholstery, carpets, and dashboard.", price: "From ₦35,000", duration: "3-4 hours", icon: <AirVent size={22} />, features: ["Vacuuming", "Steam cleaning", "Leather treatment", "Dashboard polish", "Odor removal"], popular: true },
    { id: 26, name: "Full Detailing Package", category: "detailing", description: "Complete interior and exterior detailing for ultimate vehicle care.", price: "From ₦70,000", duration: "6-8 hours", icon: <Sparkles size={22} />, features: ["Exterior + Interior", "Engine bay cleaning", "Paint correction", "Ceramic coating option"], popular: true },
    { id: 27, name: "Headlight Restoration", category: "detailing", description: "Restore cloudy, yellowed headlights for better visibility and appearance.", price: "From ₦15,000", duration: "1-2 hours", icon: <Fan size={22} />, features: ["Sanding", "Polishing", "UV sealant", "Clear coat application"], popular: false },
  ];

  const specialServices = [
    { name: "Emergency Roadside Assistance", description: "24/7 emergency support for flat tires, dead batteries, lockouts, and towing.", icon: <AlertTriangle size={20} />, contact: "0800-CAR-HELP" },
    { name: "Vehicle Inspection for Export", description: "Comprehensive inspection and documentation for vehicle export requirements.", icon: <ShieldCheck size={20} /> },
    { name: "Extended Warranty Plans", description: "Protect your vehicle with our comprehensive extended warranty packages.", icon: <Award size={20} /> },
    { name: "Fleet Management", description: "Complete fleet maintenance and management for businesses.", icon: <Users size={20} /> },
  ];

  const filteredServices = selectedCategory === 'all' ? services : services.filter(s => s.category === selectedCategory);

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  return (
    <div className="container p-0! bg-light dark:bg-dark">
      {/* Font Import */}
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes slideUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: none; } }
      `}</style> */}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-30">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none bg-size-[48px_48px] bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"
        />

        
        {/* Glow Effect */}
        <div 
          className="absolute w-150 h-100 left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)" }}
        />
        {/* Glow Effect */}
        <div 
          className="absolute w-60 h-60 left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)" }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-190 mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 dark:bg-primary/10 border border-[rgba(245,158,11,0.3)] text-[#f59e0b] font-body-alt text-xs tracking-[0.15em] uppercase py-1.5 px-4 rounded-full mb-7">
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" style={{ animation: 'pulse 2s infinite' }} />
            Professional Auto Services
          </div>
          <h1 className="font-body-alt text-[clamp(40px,7vw,72px)] font-extrabold leading-none tracking-[-0.02em] mb-5 uppercase">
            Your Car Deserves<br /><span className="text-[#f59e0b]">Expert Hands</span>
          </h1>
          <p className="text-base text-[#7a7f96] leading-relaxed max-w-[520px] mx-auto mb-9">
            From routine maintenance to complex engine rebuilds — certified technicians, factory-grade equipment, and a 12-month warranty on every job.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="inline-flex items-center gap-2 bg-[#f59e0b] font-body-alt font-bold text-sm tracking-[0.08em] uppercase py-3.5 px-7 rounded-md transition-all hover:bg-[#fbbf24] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(245,158,11,0.3)]">
              <Phone size={16} /> Schedule Service
            </button>
            <Link to="/listings" className="inline-flex items-center gap-2 bg-transparent font-body-alt font-bold text-sm tracking-[0.08em] uppercase py-3.5 px-7 rounded-md border border-[#2a2d38] transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]">
              <SearchCheckIcon size={16} /> Find Vehicle
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="bg-light-alt dark:bg-dark-alt border-t border-b border-dark-alt/20 dark:border-light-alt/20">
        <div className="mx-auto py-5 px-6 grid grid-cols-2 md:grid-cols-4">
          {[
            { num: '5,000+', label: 'Vehicles Serviced' },
            { num: '12mo', label: 'Repair Warranty' },
            { num: '24/7', label: 'Emergency Support' },
            { num: '27', label: 'Service Types' },
          ].map((s, i) => (
            <div key={i} className="py-3 px-10 text-center border-r border-dark-alt/20 dark:border-light-alt/20 last:border-r-0 max-md:border-r-0">
              <div className="font-body-alt text-[28px] font-extrabold text-[#f59e0b] leading-none">{s.num}</div>
              <div className="text-[11px] text-[#7a7f96] uppercase tracking-[0.1em] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div className=" mx-auto pt-12 pb-6 px-6">
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`inline-flex items-center gap-1.5 py-2 px-4.5 bg-light-alt dark:bg-dark-alt border border-[#2a2d38] rounded-md  text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                selectedCategory === cat.id 
                  ? 'bg-[rgba(245,158,11,0.12)] border-[#f59e0b] text-[#f59e0b]' 
                  : 'text-[#7a7f96] hover:border-[rgba(245,158,11,0.4)] hover:text-[#f59e0b]'
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className=" mx-auto py-2 pb-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`bg-light-alt dark:bg-dark-alt border border-[#2a2d38] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-[rgba(245,158,11,0.4)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(245,158,11,0.1)] relative ${
                service.popular ? 'border-[rgba(245,158,11,0.25)]' : ''
              }`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {service.popular && (
                <div className="absolute top-3.5 right-3.5 bg-[#f59e0b] text-[#0d0e11] font-body-alt font-bold text-[10px] tracking-[0.1em] uppercase py-0.5 px-2 rounded flex items-center gap-1">
                  <Star size={9} fill="currentColor" /> Popular
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.2)] rounded-lg flex items-center justify-center text-[#f59e0b] transition-all group-hover:bg-[#f59e0b] group-hover:text-[#0d0e11]">
                    {service.icon}
                  </div>
                </div>
                <div className="font-body-alt text-[19px] font-bold uppercase tracking-[0.03em] mb-2">{service.name}</div>
                <div className="text-[13px] text-[#7a7f96] leading-relaxed mb-4">{service.description}</div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[11px] text-[#7a7f96] bg-light dark:bg-dark border border-[#2a2d38] py-1 px-2.5 rounded">{f}</span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-[11px] text-[#7a7f96] bg-light dark:bg-dark border border-[#2a2d38] py-1 px-2.5 rounded">+{service.features.length - 3} more</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4.5 border-t border-[#2a2d38]">
                  <div>
                    <div className="font-body-alt text-[22px] font-extrabold ">{service.price}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7a7f96] mt-0.5">
                      <Clock size={11} /> {service.duration}
                    </div>
                  </div>
                  <button 
                    className="inline-flex items-center gap-1.5 bg-[#1e2028] border border-[#2a2d38] text-[#f0f1f5] font-body-alt font-bold text-[13px] tracking-[0.06em] uppercase py-2.5 px-4.5 rounded-md transition-all hover:bg-[#f59e0b] hover:border-[#f59e0b] hover:text-[#0d0e11]"
                    onClick={() => handleBookService(service)}
                  >
                    Book Now <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-[#7a7f96]">
            <Package size={40} className="mx-auto mb-4 opacity-40" />
            <p className="font-body-alt text-xl uppercase tracking-[0.05em]">No services found</p>
          </div>
        )}
      </div>

      {/* Special Services Section */}
      <div className="bg-[#16181e] border-t border-b border-[#2a2d38] py-16 px-6">
        <div className="text-center mb-12">
          <div className="inline-block font-body-alt text-[11px] tracking-[0.2em] uppercase text-[#f59e0b] mb-3">Beyond the Basics</div>
          <div className="font-body-alt text-[clamp(28px,4vw,42px)] font-extrabold uppercase leading-none">Additional Services</div>
          <div className="text-sm text-[#7a7f96] mt-2.5">We go beyond standard repairs to cover every automotive need</div>
        </div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {specialServices.map((s, i) => (
            <div key={i} className="bg-[#0d0e11] border border-[#2a2d38] rounded-lg p-7 transition-all hover:border-[rgba(245,158,11,0.3)]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.2)] flex items-center justify-center text-[#f59e0b] mb-3.5">{s.icon}</div>
              <div className="font-body-alt text-[15px] font-bold uppercase tracking-[0.04em] mb-2">{s.name}</div>
              <div className="text-xs text-[#7a7f96] leading-relaxed">{s.description}</div>
              {s.contact && <div className="text-[11px] text-[#f59e0b] font-mono mt-2">{s.contact}</div>}
              <button className="inline-flex items-center gap-1 text-xs text-[#f59e0b] mt-3 font-body-alt font-semibold tracking-[0.06em] uppercase bg-none border-none cursor-pointer">
                Learn More <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <section className="max-w-[1200px] mx-auto py-20 px-6">
        <div className="text-center mb-12">
          <div className="inline-block font-body-alt text-[11px] tracking-[0.2em] uppercase text-[#f59e0b] mb-3">Why Choose Us</div>
          <div className="font-body-alt text-[clamp(28px,4vw,42px)] font-extrabold uppercase leading-none">Built on Trust &amp; Precision</div>
          <div className="text-sm text-[#7a7f96] mt-2.5">Quality service backed by years of hands-on expertise</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: <CheckCircle size={24} />, title: 'Certified Technicians', desc: 'ASE-certified mechanics with deep hands-on experience across all makes and models.' },
            { icon: <Shield size={24} />, title: '12-Month Warranty', desc: 'Every repair is backed by a comprehensive parts and labor warranty — no exceptions.' },
            { icon: <Clock size={24} />, title: 'Quick Turnaround', desc: 'Streamlined workflows and well-stocked parts inventory keep your downtime minimal.' },
            { icon: <Phone size={24} />, title: '24/7 Support', desc: 'Round-the-clock assistance for roadside emergencies, questions, and booking.' },
            { icon: <Star size={24} />, title: 'OEM-Grade Parts', desc: 'We source genuine and OEM-equivalent parts for lasting, reliable repairs.' },
            { icon: <Award size={24} />, title: 'Transparent Pricing', desc: 'No hidden fees. Detailed quotes before work begins — always.' },
          ].map((t, i) => (
            <div key={i} className="bg-[#16181e] border border-[#2a2d38] rounded-lg p-8 flex gap-5 items-start transition-all hover:border-[rgba(245,158,11,0.3)]">
              <div className="text-[#f59e0b] flex-shrink-0 mt-0.5">{t.icon}</div>
              <div>
                <div className="font-body-alt text-[17px] font-bold uppercase tracking-[0.04em] mb-1.5">{t.title}</div>
                <div className="text-[13px] text-[#7a7f96] leading-relaxed">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#16181e] border-t border-[#2a2d38] py-20 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(245,158,11,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <div className="font-body-alt text-[clamp(32px,5vw,52px)] font-extrabold uppercase leading-[1.05] mb-4">Ready to Service<br />Your Vehicle?</div>
          <div className="text-sm text-[#7a7f96] mb-9 leading-relaxed">Schedule an appointment today and experience automotive care done right — on time, on budget, with a warranty you can trust.</div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="inline-flex items-center gap-2 bg-[#f59e0b] text-[#0d0e11] font-body-alt font-bold text-sm tracking-[0.08em] uppercase py-3.5 px-7 rounded-md transition-all hover:bg-[#fbbf24] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(245,158,11,0.3)]">
              <CalendarDays size={16} /> Book Appointment
            </button>
            <button className="inline-flex items-center gap-2 bg-transparent text-[#f0f1f5] font-body-alt font-bold text-sm tracking-[0.08em] uppercase py-3.5 px-7 rounded-md border border-[#2a2d38] transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]">
              <Phone size={16} /> 0800-CAR-SERV
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-[#16181e] border border-[#2a2d38] rounded-2xl max-w-[460px] w-full p-8 relative animate-[slideUp_0.22s_ease]" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 bg-[#1e2028] border border-[#2a2d38] text-[#7a7f96] w-8 h-8 rounded-md flex items-center justify-center cursor-pointer transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]" onClick={() => setShowBookingModal(false)}>
              <X size={14} />
            </button>
            <div className="font-body-alt text-[22px] font-extrabold uppercase tracking-[0.03em] mb-1">Book Service</div>
            <div className="font-body-alt text-[15px] text-[#f59e0b] uppercase tracking-[0.06em] mb-5">{selectedService.name}</div>
            <div className="flex gap-4 mb-6 pb-5 border-b border-[#2a2d38]">
              <div className="text-xs text-[#7a7f96]">
                <strong className="text-[#f59e0b] text-sm block font-body-alt font-bold">{selectedService.price}</strong>
                Starting price
              </div>
              <div className="text-xs text-[#7a7f96]">
                <strong className="text-[#f59e0b] text-sm block font-body-alt font-bold">{selectedService.duration}</strong>
                Est. duration
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div><input type="text" placeholder="Full Name" className="w-full py-2.5 px-3.5 bg-[#1e2028] border border-[#2a2d38] text-[#f0f1f5] rounded-md  text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#7a7f96]" /></div>
              <div><input type="email" placeholder="Email Address" className="w-full py-2.5 px-3.5 bg-[#1e2028] border border-[#2a2d38] text-[#f0f1f5] rounded-md  text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#7a7f96]" /></div>
              <div><input type="tel" placeholder="Phone Number" className="w-full py-2.5 px-3.5 bg-[#1e2028] border border-[#2a2d38] text-[#f0f1f5] rounded-md  text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#7a7f96]" /></div>
              <div><input type="date" className="w-full py-2.5 px-3.5 bg-[#1e2028] border border-[#2a2d38] text-[#f0f1f5] rounded-md  text-sm outline-none focus:border-[#f59e0b]" /></div>
              <div><textarea rows={3} placeholder="Additional notes (optional)" className="w-full py-2.5 px-3.5 bg-[#1e2028] border border-[#2a2d38] text-[#f0f1f5] rounded-md  text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#7a7f96] resize-none"></textarea></div>
              <button className="w-full mt-1.5 bg-[#f59e0b] text-[#0d0e11] border-none rounded-lg font-body-alt font-extrabold text-[15px] tracking-[0.1em] uppercase py-3.5 cursor-pointer transition-all hover:bg-[#fbbf24] hover:shadow-[0_8px_24px_rgba(245,158,11,0.25)]">Submit Booking Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;