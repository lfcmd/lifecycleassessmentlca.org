
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart3, LineChart, FileText } from "lucide-react";
import { PieChart as RechartsPlot } from "recharts";
import PaymentButton from "../payment/PaymentButton";

interface AnalysisPanelProps {
  hasCalculated: boolean;
  results: {
    materials: number;
    production: number;
    transport: number;
    usage: number;
    disposal: number;
    total: number;
  };
  chartData: {
    name: string;
    value: number;
    fill: string;
  }[];
  transportValues: {
    distance: number;
    method: string;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handlePurchaseReport: () => void;
  loading: boolean;
}

const AnalysisPanel = ({
  hasCalculated,
  results,
  chartData,
  transportValues,
  activeTab,
  setActiveTab,
  loading
}: AnalysisPanelProps) => {
  if (!hasCalculated) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="text-center text-muted-foreground">
          <p>请输入产品信息并点击"计算碳足迹"按钮</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="chart">图表分析</TabsTrigger>
          <TabsTrigger value="results">减排建议</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="flex-1 flex flex-col">
          <div className="mb-4">
            <p className="text-lg font-semibold text-eco-darkBlue">
              碳足迹总量: <span className="text-eco-green">{results.total} kg CO<sub>2</sub>e</span>
            </p>
          </div>
          
          <div className="space-y-2 mb-4 flex-grow">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span>{item.name}</span>
                </div>
                <div className="font-medium">
                  {item.value} kg CO<sub>2</sub>e
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 mt-auto">
            <PaymentButton
              priceId="price_1OuQWSJqIxGLUcoKi1OLyHPi"
              className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              购买完整报告
            </PaymentButton>
            
            <p className="text-xs text-center text-muted-foreground">
              购买完整报告可获取详细的碳足迹分析以及减排建议
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="flex-1 flex flex-col">
          <div className="space-y-4 text-sm mb-4 flex-grow">
            <p>
              根据您的产品信息，我们发现以下几个关键减排机会:
            </p>
            
            <div className="space-y-1">
              <p className="font-medium">1. 原材料优化</p>
              <p className="text-muted-foreground pl-4">
                替换高碳排放材料，使用回收材料可减少约{" "}
                {Math.round(results.materials * 0.3)} kg CO₂e 排放
              </p>
            </div>
            
            {results.production > 30 && (
              <div className="space-y-1">
                <p className="font-medium">2. 生产过程改进</p>
                <p className="text-muted-foreground pl-4">
                  优化能源使用，提高生产效率可减少约{" "}
                  {Math.round(results.production * 0.25)} kg CO₂e 排放
                </p>
              </div>
            )}
            
            {transportValues.method === "air" && (
              <div className="space-y-1">
                <p className="font-medium">3. 物流优化</p>
                <p className="text-muted-foreground pl-4">
                  从航空运输转为海运可减少约{" "}
                  {Math.round(results.transport * 0.7)} kg CO₂e 排放
                </p>
              </div>
            )}
            
            <p className="text-xs italic">
              以上仅为初步估算，购买完整报告可获取更详细的减排路径和实施建议。
            </p>
          </div>
          
          <div className="space-y-3 mt-auto">
            <PaymentButton
              priceId="price_1OuQVwJqIxGLUcoKyGae2O0c"
              className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              获取定制减排方案
            </PaymentButton>
            
            <p className="text-xs text-center text-muted-foreground">
              我们的专家将为您提供针对您产品特点的定制化减排解决方案
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisPanel;
