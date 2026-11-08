import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Video Editing',
    date: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [activationNotice, setActivationNotice] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { setCursor, resetCursor } = useCursor();

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const titleBoxRef = useRef(null);
  const descRef = useRef(null);
  const formColRef = useRef(null);
  const infoColRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Large title word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Staggered Content: Description paragraph
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.15,
            ease: 'power3.out',
          }
        );
      }

      // 3. Staggered Content: Left column inquiry form container reveal
      if (formColRef.current) {
        gsap.fromTo(
          formColRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formColRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 4. Staggered Content: Right column direct contact items reveal
      if (infoColRef.current) {
        gsap.fromTo(
          infoColRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoColRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const servicesList = [
    'Video Editing',
    'Videography',
    'Motion Graphics'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        _subject: `New Inquiry from ${formData.name} – Prayag Das Studio`,
        _template: 'table',
        _captcha: 'false',
        'Full Name': formData.name,
        'Email Address': formData.email,
        'Phone Number': formData.phone || 'Not provided',
        'Service Required': formData.service,
        'Target Timeline': formData.date || 'Not provided',
        'Project Details': formData.message,
      };

      // Send directly to prayagdas2003@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/prayagdas2003@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      setSubmittedData({ ...formData });

      if (result.success === 'true' || result.success === true) {
        setIsSucceeded(true);
        setActivationNotice(false);
      } else if (result.message && result.message.includes('Activation')) {
        setIsSucceeded(true);
        setActivationNotice(true);
      } else {
        throw new Error(result.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Even if network has an issue, preserve submittedData for the user
      setSubmittedData({ ...formData });
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form after successful submission
  const handleSendAnother = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Video Editing',
      date: '',
      message: '',
    });
    setErrorMessage('');
    setIsSucceeded(false);
    setActivationNotice(false);
    setSubmittedData(null);
  };

  return (
    <main ref={pageRef} className="pt-32 pb-20 md:pt-40">
      {/* Header */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA] transform-gpu will-change-transform block">
          INITIATE A COMMISSION
        </span>
        <div ref={titleBoxRef}>
          <WordReveal
            text="LET'S TALK"
            as="h1"
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#FFFFFF] uppercase mt-3 tracking-tight transform-gpu will-change-transform"
          />
        </div>
        <p
          ref={descRef}
          className="text-base text-[#A1A1AA] font-light max-w-xl mt-6 leading-relaxed transform-gpu will-change-transform"
        >
          Tell us about your upcoming project, campaign, or event. We respond to all serious inquiries within 24 hours.
        </p>
      </section>

      {/* Main Form & Info Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-28">
        {/* Left Column: Inquiry Form */}
        <div
          ref={formColRef}
          className="lg:col-span-7 bg-[#111111] text-[#F5F4F0] p-8 sm:p-12 rounded-xs shadow-2xl transform-gpu will-change-transform"
        >
          {isSucceeded ? (
            <div className="py-10 text-center space-y-6 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-[#F5F4F0] mx-auto" />
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F4F0] uppercase font-normal">
                {activationNotice ? 'ACTIVATION REQUIRED' : 'INQUIRY RECEIVED'}
              </h2>
              <p className="text-sm text-[#A1A1AA] font-light max-w-md mx-auto leading-relaxed">
                {activationNotice ? (
                  <span>
                    Form submitted! Since this is the first time, an <strong>Activate Form</strong> link has been sent to <strong>prayagdas2003@gmail.com</strong>. Please check your inbox and click it once to start receiving inquiries.
                  </span>
                ) : (
                  <span>
                    Thank you for reaching out, {submittedData?.name || formData.name}. Your inquiry has been dispatched and our studio team will respond within 24 hours.
                  </span>
                )}
              </p>

              {/* Submitted Inquiry Summary Card */}
              {submittedData && (
                <div className="bg-[#181818] border border-white/10 rounded-xl p-6 text-left space-y-4 max-w-lg mx-auto shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#ea580c]">
                      YOUR SUBMITTED DATA
                    </span>
                    <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                      CONFIRMATION COPY
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Name</span>
                      <span className="text-white font-medium text-sm">{submittedData.name}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Email</span>
                      <span className="text-white font-medium text-sm">{submittedData.email}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Phone</span>
                      <span className="text-white font-medium text-sm">{submittedData.phone || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Service</span>
                      <span className="text-[#ea580c] font-medium text-sm">{submittedData.service}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider">Target Date / Timeline</span>
                      <span className="text-white font-medium text-sm">{submittedData.date || 'Flexible'}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-xs">
                    <span className="text-[#A1A1AA] block text-[10px] uppercase tracking-wider mb-1">Project Details</span>
                    <p className="text-white/90 leading-relaxed bg-[#111] p-3 rounded-lg border border-white/5 whitespace-pre-wrap">
                      {submittedData.message}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleSendAnother}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="mt-6 inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#F5F4F0] border-b border-[#F5F4F0] pb-1 hover:opacity-75 transition-opacity"
              >
                <span>SEND ANOTHER MESSAGE</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6A] font-semibold">
                  01 / YOUR DETAILS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6F6F6A] mb-2">FULL NAME *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#F5F4F0]/20 rounded-xs py-3 px-4 text-sm text-[#F5F4F0] focus:outline-hidden focus:border-[#F5F4F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6F6F6A] mb-2">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#F5F4F0]/20 rounded-xs py-3 px-4 text-sm text-[#F5F4F0] focus:outline-hidden focus:border-[#F5F4F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6F6F6A] mb-2">PHONE / WHATSAPP</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#F5F4F0]/20 rounded-xs py-3 px-4 text-sm text-[#F5F4F0] focus:outline-hidden focus:border-[#F5F4F0]"
                    />
                  </div>
                </div>
              </div>

              {/* Service Category Radio Pills */}
              <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-[#6F6F6A] font-semibold">
                  02 / SERVICE TYPE *
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {servicesList.map((srv) => (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setFormData({ ...formData, service: srv })}
                      className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                        formData.service === srv
                          ? 'bg-[#F5F4F0] text-[#111111] border-[#F5F4F0] font-semibold'
                          : 'bg-transparent text-[#6F6F6A] border-[#F5F4F0]/20 hover:text-[#F5F4F0]'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Message */}
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6A] font-semibold block mb-2">
                    03 / PROJECT TIMELINE & BRIEF
                  </span>
                  <label className="block text-xs uppercase tracking-wider text-[#6F6F6A] mb-2">TARGET DATE / TIMELINE</label>
                  <input
                    type="text"
                    name="timeline"
                    placeholder="e.g. November 2026 or Spring Campaign"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#F5F4F0]/20 rounded-xs py-3 px-4 text-sm text-[#F5F4F0] focus:outline-hidden focus:border-[#F5F4F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6F6F6A] mb-2">PROJECT DESCRIPTION & DETAILS *</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    placeholder="Provide details regarding shoot location, scope, deliverables, and vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#F5F4F0]/20 rounded-xs py-3 px-4 text-sm text-[#F5F4F0] focus:outline-hidden focus:border-[#F5F4F0]"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-sm text-red-400 text-center">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className={`w-full py-4 bg-[#F5F4F0] text-[#111111] font-semibold uppercase tracking-[0.25em] text-xs rounded-full hover:bg-[#D8D7D2] transition-colors flex items-center justify-center space-x-3 group cursor-pointer ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <span>{isSubmitting ? 'SENDING...' : 'SUBMIT INQUIRY'}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Contact & Location Info */}
        <div
          ref={infoColRef}
          className="lg:col-span-5 flex flex-col justify-between space-y-12"
        >
          <div className="space-y-6 transform-gpu will-change-transform">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
              DIRECT CONTACT
            </span>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 border-b border-white/10 pb-6">
                <Mail className="w-5 h-5 text-[#ea580c] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">EMAIL</span>
                  <a href="mailto:prayagdas2003@gmail.com" className="font-serif text-xl text-[#F5F4F0] hover:text-[#ea580c] hover:underline">
                    prayagdas2003@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-b border-white/10 pb-6">
                <Phone className="w-5 h-5 text-[#ea580c] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">PHONE / WHATSAPP</span>
                  <a href="tel:+918249222827" className="font-serif text-xl text-[#F5F4F0] hover:text-[#ea580c] hover:underline">
                    +91 8249222827
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-b border-white/10 pb-6">
                <MapPin className="w-5 h-5 text-[#ea580c] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">STUDIO ADDRESS</span>
                  <p className="font-serif text-xl text-[#F5F4F0]">
                    Plot No-D/110, CDA, Sector-7<br />
                    Cuttack - 753014, Odisha, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] p-6 rounded-xs space-y-2 border border-white/10 transform-gpu will-change-transform">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ea580c]">
              GLOBAL AVAILABILITY
            </span>
            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
              We maintain active travel carnets and press accreditation across Asia, Europe, and North America.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
