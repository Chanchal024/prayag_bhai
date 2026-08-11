import React, { useState } from 'react';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi';

const BehanceIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.813 3-3.035 0-4.913-2.007-4.913-4.818 0-2.964 1.93-4.908 4.793-4.908 2.87 0 4.549 1.884 4.549 4.887 0 .363-.034.786-.062 1.039h-6.732c.112 1.258.98 2.11 2.36 2.11 1.203 0 1.905-.515 2.198-1.31h2.62zm-4.966-4.524c-1.129 0-1.782.721-1.921 1.774h3.766c-.07-1.047-.73-1.774-1.845-1.774zm-10.96-5.476h-7.8v14h8.318c3.212 0 5.282-1.68 5.282-4.382 0-1.892-1.054-3.216-2.585-3.791 1.25-.563 2.05-1.758 2.05-3.344 0-2.383-1.802-3.483-5.265-3.483zm-4.8 2.5h3.011c1.373 0 2.216.52 2.216 1.543 0 1.05-.885 1.58-2.261 1.58h-2.966v-3.123zm0 5.623h3.409c1.472 0 2.456.551 2.456 1.693 0 1.189-.966 1.771-2.456 1.771h-3.409v-3.464z"/>
  </svg>
);


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Commercial Video',
    budget: '$5k - $10k',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      projectType: 'Commercial Video',
      budget: '$5k - $10k',
      message: ''
    });
  };

  const socialLinks = [
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/prayag-kumar-das-854a5b270?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
    { icon: FiInstagram, href: "https://www.instagram.com/__.__.prayag.__.__?igsh=MThqd3gyenZpM244NQ==", label: "Instagram" }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-[#0B0B0B]">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#FF6A1A]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectionHeading 
          subtitle="Get In Touch" 
          title="Let's Create Something Amazing" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                Have a project in mind?
              </h3>
              <p className="text-base text-secondary-text font-light leading-relaxed mb-8">
                Available for high-end video editing, motion design, color grading, and commercial post-production contracts worldwide.
              </p>

              {/* Direct Info List */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#141414] border border-white/10 group-hover:border-[#FF6A1A] flex items-center justify-center text-[#FF6A1A] text-xl transition-all">
                    <FiMail />
                  </div>
                  <div>
                    <div className="text-xs text-muted-text uppercase font-mono">Email Directly</div>
                    <a href="mailto:prayagdas2003@gmail.com" className="text-base font-semibold text-white hover:text-[#FF8A3D] transition-colors">
                      prayagdas2003@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#141414] border border-white/10 group-hover:border-[#FF6A1A] flex items-center justify-center text-[#FF6A1A] text-xl transition-all">
                    <FiPhone />
                  </div>
                  <div>
                    <div className="text-xs text-muted-text uppercase font-mono">Phone / WhatsApp</div>
                    <a href="tel:+918249222827" className="text-base font-semibold text-white hover:text-[#FF8A3D] transition-colors">
                      +91 8249222827
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#141414] border border-white/10 group-hover:border-[#FF6A1A] flex items-center justify-center text-[#FF6A1A] text-xl transition-all">
                    <FiMapPin />
                  </div>
                  <div>
                    <div className="text-xs text-muted-text uppercase font-mono">Base Location</div>
                    <span className="text-base font-semibold text-white">
                      Los Angeles, CA • Remote Worldwide
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <div className="text-xs text-muted-text uppercase font-mono mb-3">Follow &amp; Connect</div>
                <div className="flex items-center gap-3">
                  {socialLinks.map((s, idx) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={idx}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-[#141414] border border-white/10 hover:border-[#FF6A1A] hover:bg-[#FF6A1A] flex items-center justify-center text-white text-lg transition-all shadow-md group"
                        aria-label={s.label}
                      >
                        <Icon className="group-hover:scale-110 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-[32px] bg-[#141414] border border-white/10 shadow-2xl space-y-6">
              
              {submitted && (
                <div className="p-4 rounded-xl bg-[#FF6A1A]/20 border border-[#FF6A1A] text-white text-sm font-semibold flex items-center gap-2">
                  <span>✓ Thank you! Your message has been received. I'll respond within 24 hours.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-text mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Christopher Nolan"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-muted-text focus:outline-none focus:border-[#FF6A1A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted-text mb-2">Your Email *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-muted-text focus:outline-none focus:border-[#FF6A1A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-text mb-2">Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white focus:outline-none focus:border-[#FF6A1A] transition-colors"
                  >
                    <option value="Commercial Video">Commercial Video</option>
                    <option value="Motion Graphics">3D / 2D Motion Graphics</option>
                    <option value="Color Grading">DaVinci Color Grading</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Full Campaign">Full Campaign Post-Production</option>
                  </select>
                </div>


              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-text mb-2">Project Brief / Message *</label>
                <textarea 
                  required 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell me about your timeline, deliverables, and vision..."
                  className="w-full px-5 py-3.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-muted-text focus:outline-none focus:border-[#FF6A1A] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF6A1A] via-[#FF7A2A] to-[#B52818] text-white font-bold text-base shadow-[0_0_30px_rgba(255,106,26,0.4)] hover:shadow-[0_0_45px_rgba(255,106,26,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
