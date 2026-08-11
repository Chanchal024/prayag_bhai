import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';


// Premium SVG Badges for Adobe Suite
const PremiereIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#00005B"/>
    <path d="M7 6H11C12.6569 6 14 7.34315 14 9C14 10.6569 12.6569 12 11 12H9V18H7V6ZM9 8V10H11C11.5523 10 12 9.55228 12 9C12 8.44772 11.5523 8 11 8H9Z" fill="#9999FF"/>
    <path d="M15 11H17V12.5C17.5 11.5 18.5 11 19.5 11C20 11 20.5 11.1 21 11.3V13.3C20.4 13.1 19.8 13 19.2 13C18.2 13 17.5 13.7 17.5 15V18H15.5V11H15Z" fill="#9999FF"/>
  </svg>
);

const AfterEffectsIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#00005B"/>
    <path d="M6 18L9.5 6H11.5L15 18H13L12.1 14.8H8.9L8 18H6ZM9.4 13H11.6L10.5 9L9.4 13Z" fill="#9999FF"/>
    <path d="M16 14.5C16 12.5 17.5 11 19.5 11C21.5 11 22.5 12.5 22.5 14.5H17.8C18 15.5 18.7 16.3 19.7 16.3C20.5 16.3 21.1 15.9 21.4 15.3L22.8 16C22.2 17.2 21.1 18 19.7 18C17.5 18 16 16.5 16 14.5ZM17.8 13.5H21C20.8 12.7 20.2 12.2 19.5 12.2C18.7 12.2 18 12.7 17.8 13.5Z" fill="#9999FF"/>
  </svg>
);

const PhotoshopIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#001E36"/>
    <path d="M7 6H11C12.6569 6 14 7.34315 14 9C14 10.6569 12.6569 12 11 12H9V18H7V6ZM9 8V10H11C11.5523 10 12 9.55228 12 9C12 8.44772 11.5523 8 11 8H9Z" fill="#31A8FF"/>
    <path d="M16 15.5C16.5 16 17.3 16.3 18.2 16.3C19.1 16.3 19.6 15.8 19.6 15.2C19.6 14.4 18.5 14.2 17.4 13.8C16 13.3 15.2 12.5 15.2 11.2C15.2 9.5 16.7 8.5 18.5 8.5C19.7 8.5 20.7 8.9 21.4 9.6L20.2 10.9C19.7 10.4 19.1 10.1 18.4 10.1C17.6 10.1 17.1 10.5 17.1 11.1C17.1 11.8 18.1 12 19.2 12.4C20.7 12.9 21.6 13.6 21.6 15.1C21.6 16.9 20 18 18 18C16.6 18 15.4 17.5 14.6 16.6L16 15.5Z" fill="#31A8FF"/>
  </svg>
);

const IllustratorIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#330000"/>
    <path d="M6 18L9.5 6H11.5L15 18H13L12.1 14.8H8.9L8 18H6ZM9.4 13H11.6L10.5 9L9.4 13Z" fill="#FF9A00"/>
    <path d="M17 6H19V8H17V6ZM17 10H19V18H17V10Z" fill="#FF9A00"/>
  </svg>
);

const DaVinciIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#141414" stroke="#FF6A1A" strokeWidth="1.5"/>
    <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12" stroke="#FF6A1A" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="4" fill="#FF8A3D"/>
  </svg>
);

const BlenderIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#141414"/>
    <path d="M12 6L14.5 10.5H9.5L12 6Z" fill="#E87D0D"/>
    <circle cx="12" cy="13" r="3.5" fill="#E87D0D"/>
  </svg>
);

const FigmaIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#141414"/>
    <path d="M8 12C6.9 12 6 11.1 6 10C6 8.9 6.9 8 8 8H12V12H8Z" fill="#F24E1E"/>
    <path d="M12 8H16C17.1 8 18 8.9 18 10C18 11.1 17.1 12 16 12H12V8Z" fill="#FF7262"/>
    <path d="M12 12H16C17.1 12 18 12.9 18 14C18 15.1 17.1 16 16 16C14.9 16 14 15.1 14 14V12H12Z" fill="#1ABCFE"/>
    <path d="M6 14C6 12.9 6.9 12 8 12H12V16C12 17.1 11.1 18 10 18C8.9 18 8 17.1 8 16C8 14.9 6.9 14 6 14Z" fill="#0ACF83"/>
  </svg>
);

export default function Software() {
  const tools = [
    { name: "Premiere Pro", Component: PremiereIcon, label: "Mastery" },
    { name: "After Effects", Component: AfterEffectsIcon, label: "VFX & Motion" },
    { name: "DaVinci Resolve", Component: DaVinciIcon, label: "Color Grading" },
    { name: "Photoshop", Component: PhotoshopIcon, label: "Key Visuals" },
    { name: "Illustrator", Component: IllustratorIcon, label: "Vector Art" },
    { name: "Blender", Component: BlenderIcon, label: "3D Animation" },
    { name: "Figma", Component: FigmaIcon, label: "UI Motion" }
  ];

  return (
    <section className="py-24 relative bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FF6A1A]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        <SectionHeading 
          subtitle="Software Expertise" 
          title="Industry Standard Applications" 
          centered 
        />

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12">
          {tools.map((tool, index) => {
            const IconComponent = tool.Component;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="group flex flex-col items-center cursor-pointer"
              >
                {/* Circular Glass Icon Container */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#141414] border border-white/10 group-hover:border-[#FF6A1A] flex items-center justify-center transition-all duration-300 shadow-xl group-hover:shadow-[0_0_35px_rgba(255,106,26,0.4)] relative">
                  <IconComponent />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#FF6A1A]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <span className="mt-4 text-sm font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                  {tool.name}
                </span>
                <span className="text-[11px] font-mono text-muted-text mt-0.5">
                  {tool.label}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
