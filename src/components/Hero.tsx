
import React from "react";
import { Button } from "@/components/ui/button";
import { ChartLine, Leaf } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-eco-lightGreen px-4 py-2 rounded-full">
              <Leaf className="h-4 w-4 text-eco-green" />
              <span className="text-sm font-medium text-eco-green">专业碳足迹计算服务</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-eco-darkBlue">
              专业的 <span className="text-eco-green">LCA生命周期评价</span> 和碳足迹计算
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              我们可以计算产品全生命周期的环境影响，根据您的需要，可以计算简要版 Simple LCA 和详细版 Detail LCA。Simple LCA 更加经济高效，Detail LCA 提供全面深入的分析。
            </p>
            
            <div className="pt-8 flex items-center gap-8">
              <div className="flex">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-eco-darkBlue">100+</span>
                  <span className="text-sm text-muted-foreground">企业客户</span>
                </div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-eco-darkBlue">1000+</span>
                  <span className="text-sm text-muted-foreground">产品评估</span>
                </div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-eco-darkBlue">98%</span>
                  <span className="text-sm text-muted-foreground">客户满意度</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-eco-green/30 to-eco-blue/30 blur-xl"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-eco-darkBlue">产品碳足迹概览</h3>
                  <ChartLine className="h-5 w-5 text-eco-green" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>原材料</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-eco-green rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>生产过程</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-eco-blue rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>运输</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-eco-gray rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>使用阶段</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>废弃处理</span>
                      <span className="font-medium">2%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-eco-darkBlue rounded-full" style={{ width: "2%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">总碳足迹</span>
                    <span className="text-xl font-bold text-eco-darkBlue">8.5 kg CO<sub>2</sub>e</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
