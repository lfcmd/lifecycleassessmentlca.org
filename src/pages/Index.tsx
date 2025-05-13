
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EnhancedCalculator from "@/components/EnhancedCalculator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <EnhancedCalculator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
