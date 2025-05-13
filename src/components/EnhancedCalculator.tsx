
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPie } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CalculatorForm from "./calculator/CalculatorForm";
import ResultCharts from "./calculator/ResultCharts";
import AnalysisPanel from "./calculator/AnalysisPanel";

const EnhancedCalculator = () => {
  const navigate = useNavigate();
  const [materialValues, setMaterialValues] = useState({
    material1: 10,
    material2: 5,
    material3: 3,
  });
  
  const [energyValues, setEnergyValues] = useState({
    electricity: 100,
    naturalGas: 50,
  });
  
  const [transportValues, setTransportValues] = useState({
    distance: 1000,
    method: "truck",
  });
  
  const [results, setResults] = useState({
    materials: 156,
    production: 89,
    transport: 44,
    usage: 32,
    disposal: 21,
    total: 342,
  });
  
  const [hasCalculated, setHasCalculated] = useState(false);
  const [activeTab, setActiveTab] = useState("chart");
  const [loading, setLoading] = useState(false);
  
  const handleMaterialChange = (field: string, value: string) => {
    setMaterialValues({
      ...materialValues,
      [field]: parseFloat(value) || 0,
    });
  };
  
  const handleEnergyChange = (field: string, value: string) => {
    setEnergyValues({
      ...energyValues,
      [field]: parseFloat(value) || 0,
    });
  };
  
  const handleTransportChange = (field: string, value: string | number) => {
    setTransportValues({
      ...transportValues,
      [field]: field === "distance" ? parseFloat(value as string) || 0 : value,
    });
  };
  
  const calculateFootprint = () => {
    // This would be a more complex calculation in a real application
    // Here we're just simulating the calculation for demo purposes
    setResults({
      materials: Math.round((materialValues.material1 * 8.2) + (materialValues.material2 * 5.6) + (materialValues.material3 * 9.3)),
      production: Math.round((energyValues.electricity * 0.5) + (energyValues.naturalGas * 0.7)),
      transport: Math.round(transportValues.distance * (transportValues.method === "truck" ? 0.04 : transportValues.method === "ship" ? 0.02 : 0.1)),
      usage: 32, // Fixed for demo
      disposal: 21, // Fixed for demo
      total: 0, // Will be calculated below
    });
    
    setHasCalculated(true);
    
    // Calculate total after setting other values
    setTimeout(() => {
      setResults(prev => ({
        ...prev,
        total: prev.materials + prev.production + prev.transport + prev.usage + prev.disposal
      }));
    }, 0);
  };

  const handlePurchaseReport = async () => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "请先登录",
          description: "您需要登录后才能购买完整报告",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      
      // Determine the current URL for success/cancel redirects
      const origin = window.location.origin;
      
      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: {
          priceId: "price_1OuQWSJqIxGLUcoKi1OLyHPi", // Carbon Premium plan price ID
          successUrl: `${origin}/payment-success`,
          cancelUrl: `${origin}/payment-canceled`,
          paymentMode: "payment",
        }
      });
      
      if (error) {
        toast({
          title: "支付失败",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        toast({
          title: "支付失败",
          description: "无法创建支付会话",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "支付失败",
        description: "处理您的请求时出错",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Prepare chart data
  const chartData = [
    { name: '原材料', value: results.materials, fill: '#4ade80' }, // eco-green
    { name: '生产过程', value: results.production, fill: '#60a5fa' }, // eco-blue
    { name: '物流运输', value: results.transport, fill: '#1e40af' }, // eco-darkBlue
    { name: '使用阶段', value: results.usage, fill: '#a855f7' }, // purple
    { name: '废弃处理', value: results.disposal, fill: '#eab308' }, // yellow
  ];
  
  return (
    <section id="calculator" className="section py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
            产品碳足迹计算工具
          </h2>
          <p className="text-lg text-muted-foreground">
            使用我们的碳足迹计算器，快速估算您的产品在整个生命周期中的碳排放量
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border shadow-md">
              <CardContent className="pt-6">
                <CalculatorForm 
                  materialValues={materialValues}
                  energyValues={energyValues}
                  transportValues={transportValues}
                  handleMaterialChange={handleMaterialChange}
                  handleEnergyChange={handleEnergyChange}
                  handleTransportChange={handleTransportChange}
                  calculateFootprint={calculateFootprint}
                />
              </CardContent>
            </Card>
            
            {hasCalculated && (
              <div className="mt-8">
                <Card className="border shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-eco-darkBlue mb-4">结果图表</h3>
                    <ResultCharts results={results} />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          <div>
            <Card className="border shadow-md h-full">
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-eco-darkBlue flex items-center justify-center gap-2">
                    <ChartPie className="h-5 w-5 text-eco-green" />
                    结果分析
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {hasCalculated ? "产品碳足迹分析结果" : "填写数据并点击计算按钮"}
                  </p>
                </div>
                
                <AnalysisPanel 
                  hasCalculated={hasCalculated}
                  results={results}
                  chartData={chartData}
                  transportValues={transportValues}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  handlePurchaseReport={handlePurchaseReport}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            注意：此计算器仅供演示，实际碳足迹计算需考虑更多因素和更准确的排放因子
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCalculator;
