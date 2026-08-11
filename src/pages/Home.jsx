import React from 'react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { AboutPreview } from '../components/AboutPreview';
import { ClientLogos } from '../components/ClientLogos';
import { FeaturedWork } from '../components/FeaturedWork';
import { Experience } from '../components/Experience';
import { Expertise } from '../components/Expertise';
import { ImageBreak } from '../components/ImageBreak';
import { Testimonials } from '../components/Testimonials';
import { BottomShowcase } from '../components/BottomShowcase';
import { ContactCTA } from '../components/ContactCTA';

export const Home = () => {
  return (
    <main className="w-full">
      <Hero />
      <Stats />
      <AboutPreview />
      <ClientLogos />
      <FeaturedWork limit={5} showHeader={true} />
      <Experience />
      <Expertise />
      <ImageBreak />
      <Testimonials />
      <BottomShowcase />
      <ContactCTA />
    </main>
  );
};
