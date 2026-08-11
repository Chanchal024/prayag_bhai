import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Editorial & Fashion',
    budget: '$5,000 – $10,000',
    date: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const servicesList = [
    'Editorial & Fashion',
    'Real Estate & Architecture',
    'Commercial & Product',
    'Aerial & Aviation',
    'Travel & Documentary',
    'Fine Art Portrait',
    'Private Event & Gala'
  ];

  const budgetList = [
    '$3,500 – $5,000',
    '$5,000 – $10,000',
    '$10,000 – $25,000',
    '$25,000+'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-32 pb-20 md:pt-40">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          INITIATE A COMMISSION
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#FFFFFF] uppercase mt-3 tracking-tight">
          LET'S TALK
        </h1>
        <p className="text-base text-[#A1A1AA] font-light max-w-xl mt-6 leading-relaxed">
          Tell us about your upcoming project, campaign, or event. We respond to all serious inquiries within 24 hours.
        </p>
      </section>

      {/* Main Form & Info Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-28">
        {/* Left Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-[#111111] text-[#F5F4F0] p-8 sm:p-12 rounded-xs shadow-2xl">
          {submitted ? (
            <div className="py-16 text-center space-y-6 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-[#F5F4F0] mx-auto" />
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F4F0] uppercase font-normal">
                INQUIRY RECEIVED
              </h2>
              <p className="text-sm text-[#6F6F6A] font-light max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, {formData.name}. Our studio team has received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6F6F6A] mb-2">FULL NAME *</label>
                    <input
                      type="text"
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
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  <label className="block text-xs uppercase tracking-wider text-[#6F6F6A] mb-2">TARGET DATE / TIMELINE</label>
                  <input
                    type="text"
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
                    required
                    placeholder="Provide details regarding shoot location, scope, deliverables, and vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#F5F4F0]/20 rounded-xs py-3 px-4 text-sm text-[#F5F4F0] focus:outline-hidden focus:border-[#F5F4F0]"
                  />
                </div>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-full py-4 bg-[#F5F4F0] text-[#111111] font-semibold uppercase tracking-[0.25em] text-xs rounded-full hover:bg-[#D8D7D2] transition-colors flex items-center justify-center space-x-3 group cursor-pointer"
              >
                <span>SUBMIT INQUIRY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Contact & Location Info */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
          <div className="space-y-6">
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

          <div className="bg-[#141414] p-6 rounded-xs space-y-2 border border-white/10">
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
