
import React from "react";
import { Leaf } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-eco-darkBlue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-eco-green mr-2" />
              <span className="text-2xl font-bold">LCA<span className="text-eco-green">计算</span></span>
            </div>
            <p className="text-gray-300 mb-4">
              专业的产品生命周期评价和碳足迹计算SaaS平台，助力企业实现可持续发展目标。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.037 10.037 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482c0 .38.042.76.126 1.14A13.95 13.95 0 011.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.532l-.047-.02z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">产品与服务</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">产品碳足迹计算</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">LCA生命周期评价</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">环境产品声明</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">碳中和规划</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">可持续供应链</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">资源中心</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">博客</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">案例研究</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">白皮书</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">网络研讨会</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">行业标准</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">公司</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">关于我们</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">团队</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">职业机会</a></li>
              <li><a href="#" className="text-gray-300 hover:text-eco-green transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            © {currentYear} LCA计算. 保留所有权利.
          </p>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-eco-green transition-colors">隐私政策</a>
            <a href="#" className="hover:text-eco-green transition-colors">服务条款</a>
            <a href="#" className="hover:text-eco-green transition-colors">Cookie政策</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
