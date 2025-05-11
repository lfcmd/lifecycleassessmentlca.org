
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-eco-green mr-2" />
            <span className="text-2xl font-bold text-eco-darkBlue">LCA<span className="text-eco-green">计算</span></span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-eco-green transition-colors">产品特点</a>
            <a href="#calculator" className="text-foreground hover:text-eco-green transition-colors">碳足迹计算</a>
            <a href="#pricing" className="text-foreground hover:text-eco-green transition-colors">服务价格</a>
            <a href="#contact" className="text-foreground hover:text-eco-green transition-colors">联系我们</a>
          </nav>
          
          <div className="hidden md:block">
            <Button className="bg-eco-green hover:bg-eco-green/90 text-white">开始试用</Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 animate-fade-in">
            <a href="#features" className="block py-2 text-foreground hover:text-eco-green transition-colors">产品特点</a>
            <a href="#calculator" className="block py-2 text-foreground hover:text-eco-green transition-colors">碳足迹计算</a>
            <a href="#pricing" className="block py-2 text-foreground hover:text-eco-green transition-colors">服务价格</a>
            <a href="#contact" className="block py-2 text-foreground hover:text-eco-green transition-colors">联系我们</a>
            <Button className="mt-4 w-full bg-eco-green hover:bg-eco-green/90 text-white">开始试用</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
