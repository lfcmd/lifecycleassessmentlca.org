
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPie, Calculator as CalculatorIcon, FileText, CreditCard } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Line, LineChart } from "recharts";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  // Prepare bar chart data
  const barData = [
    { name: '原材料', 排放量: results.materials },
    { name: '生产过程', 排放量: results.production },
    { name: '物流运输', 排放量: results.transport },
    { name: '使用阶段', 排放量: results.usage },
    { name: '废弃处理', 排放量: results.disposal },
  ];

  // Emission reduction potentials (example data)
  const reductionPotentials = [
    { category: '原材料', potential: 25, description: '选择低碳替代材料' },
    { category: '生产过程', potential: 15, description: '提高能源效率' },
    { category: '物流运输', potential: 30, description: '优化运输路线和方式' },
    { category: '使用阶段', potential: 10, description: '提升产品能效' },
    { category: '废弃处理', potential: 20, description: '实施回收再利用' },
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
                <Tabs defaultValue="materials">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="materials">原材料</TabsTrigger>
                    <TabsTrigger value="energy">能源消耗</TabsTrigger>
                    <TabsTrigger value="transport">物流运输</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="materials" className="space-y-6">
                    <div>
                      <Label htmlFor="material1">主要材料 (kg)</Label>
                      <Input
                        id="material1"
                        type="number"
                        min="0"
                        value={materialValues.material1}
                        onChange={(e) => handleMaterialChange("material1", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="material2">次要材料 (kg)</Label>
                      <Input
                        id="material2"
                        type="number"
                        min="0"
                        value={materialValues.material2}
                        onChange={(e) => handleMaterialChange("material2", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="material3">包装材料 (kg)</Label>
                      <Input
                        id="material3"
                        type="number"
                        min="0"
                        value={materialValues.material3}
                        onChange={(e) => handleMaterialChange("material3", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="energy" className="space-y-6">
                    <div>
                      <Label htmlFor="electricity">电力消耗 (kWh)</Label>
                      <Input
                        id="electricity"
                        type="number"
                        min="0"
                        value={energyValues.electricity}
                        onChange={(e) => handleEnergyChange("electricity", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="naturalGas">天然气消耗 (m³)</Label>
                      <Input
                        id="naturalGas"
                        type="number"
                        min="0"
                        value={energyValues.naturalGas}
                        onChange={(e) => handleEnergyChange("naturalGas", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transport" className="space-y-6">
                    <div>
                      <Label htmlFor="distance">运输距离 (km)</Label>
                      <Input
                        id="distance"
                        type="number"
                        min="0"
                        value={transportValues.distance}
                        onChange={(e) => handleTransportChange("distance", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="transport-method">运输方式</Label>
                      <Select 
                        value={transportValues.method as string}
                        onValueChange={(value) => handleTransportChange("method", value)}
                      >
                        <SelectTrigger id="transport-method" className="mt-1">
                          <SelectValue placeholder="选择运输方式" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="truck">卡车</SelectItem>
                          <SelectItem value="ship">船舶</SelectItem>
                          <SelectItem value="air">航空</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8">
                  <Button 
                    className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
                    onClick={calculateFootprint}
                  >
                    <CalculatorIcon className="mr-2 h-4 w-4" />
                    计算碳足迹
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {hasCalculated && (
              <div className="mt-8">
                <Card className="border shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-eco-darkBlue mb-4">结果图表</h3>
                    
                    <Tabs defaultValue="pie">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="pie">饼图</TabsTrigger>
                        <TabsTrigger value="bar">柱状图</TabsTrigger>
                        <TabsTrigger value="line">趋势图</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="pie" className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            >
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} kg CO₂e`]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      
                      <TabsContent value="bar" className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={barData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value) => [`${value} kg CO₂e`, '排放量']} />
                            <Legend />
                            <Bar dataKey="排放量" fill="#4ade80" />
                          </BarChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      
                      <TabsContent value="line" className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={barData}
                            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="排放量" stroke="#4ade80" activeDot={{ r: 8 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                    </Tabs>
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
                
                {hasCalculated ? (
                  <div className="flex-1 flex flex-col">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="summary">概览</TabsTrigger>
                        <TabsTrigger value="analysis">分析</TabsTrigger>
                        <TabsTrigger value="reduction">减排</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="summary" className="flex-1 flex flex-col">
                        <div className="space-y-4 mb-6 flex-1">
                          {chartData.map((item, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{item.name}</span>
                                <span className="font-medium">{item.value} kg CO<sub>2</sub>e</span>
                              </div>
                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full" 
                                  style={{ width: `${(item.value / results.total) * 100}%`, backgroundColor: item.fill }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="analysis" className="flex-1">
                        <div className="space-y-4 text-sm">
                          <p className="mb-2">
                            您的产品碳足迹为 <strong>{results.total} kg CO<sub>2</sub>e</strong>，主要排放来源于：
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <strong>原材料阶段</strong> - 占总排放的 {((results.materials / results.total) * 100).toFixed(1)}%
                              <p className="text-muted-foreground mt-0.5">主要由原材料开采和加工产生</p>
                            </li>
                            <li>
                              <strong>生产过程</strong> - 占总排放的 {((results.production / results.total) * 100).toFixed(1)}%
                              <p className="text-muted-foreground mt-0.5">主要由能源消耗和工艺排放产生</p>
                            </li>
                            <li>
                              <strong>物流运输</strong> - 占总排放的 {((results.transport / results.total) * 100).toFixed(1)}%
                              <p className="text-muted-foreground mt-0.5">
                                {transportValues.method === "truck" ? "卡车运输" : 
                                 transportValues.method === "ship" ? "船舶运输" : "航空运输"}
                                排放系数较{transportValues.method === "air" ? "高" : "低"}
                              </p>
                            </li>
                          </ul>
                          <div className="mt-4">
                            <p className="font-medium mb-1">碳足迹热点分析</p>
                            <p>
                              {
                                Math.max(results.materials, results.production, results.transport, results.usage, results.disposal) === results.materials
                                ? "原材料是碳排放主要热点，建议关注材料选择和优化。"
                                : Math.max(results.materials, results.production, results.transport, results.usage, results.disposal) === results.production
                                ? "生产过程是碳排放主要热点，建议关注能源效率和清洁能源使用。"
                                : "物流运输是碳排放主要热点，建议优化运输路线和方式。"
                              }
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reduction" className="flex-1">
                        <div className="space-y-4">
                          <p className="text-sm mb-2">根据您的产品碳足迹分析，我们建议以下减排措施：</p>
                          
                          <div className="space-y-3">
                            {reductionPotentials.map((item, index) => (
                              <div key={index} className="bg-gray-50 rounded-md p-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium text-sm">{item.category}</span>
                                  <span className="text-eco-green text-sm font-medium">-{item.potential}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                            <p className="text-sm font-medium mb-2">获取详细的减排方案</p>
                            <p className="text-xs text-muted-foreground mb-3">
                              我们的专业团队可以为您提供更加详细的产品碳足迹分析和定制化减排方案
                            </p>
                            <Button
                              className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
                              onClick={handlePurchaseReport}
                              disabled={loading}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              {loading ? "处理中..." : "购买完整碳足迹报告"}
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">总碳足迹</span>
                        <span className="text-2xl font-bold text-eco-darkBlue">{results.total} kg CO<sub>2</sub>e</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <ChartPie className="h-12 w-12 text-muted mb-4" />
                    <p>输入数据并计算后，这里将显示您的产品碳足迹分析结果</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {hasCalculated && (
              <div className="mt-4">
                <Card className="border border-eco-green shadow-md">
                  <CardContent className="pt-4 pb-4">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-eco-green" />
                      碳足迹管理的好处
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li className="flex items-start gap-1">
                        <span>•</span> <span>满足合规要求，应对碳关税</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span>•</span> <span>提高资源效率，降低运营成本</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span>•</span> <span>增强品牌价值与市场竞争力</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span>•</span> <span>满足客户与投资者对可持续发展的期望</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
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
