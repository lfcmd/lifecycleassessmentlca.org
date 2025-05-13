
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPie, Calculator as CalculatorIcon, FileText } from "lucide-react";

const EnhancedCalculator = () => {
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
  
  return (
    <section id="calculator" className="section">
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
          </div>
          
          <div>
            <Card className="border shadow-md h-full">
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-eco-darkBlue flex items-center justify-center gap-2">
                    <ChartPie className="h-5 w-5 text-eco-green" />
                    计算结果
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {hasCalculated ? "产品碳足迹分析" : "填写数据并点击计算按钮"}
                  </p>
                </div>
                
                {hasCalculated && (
                  <div className="flex-1 flex flex-col">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="chart">图表</TabsTrigger>
                        <TabsTrigger value="table">表格</TabsTrigger>
                        <TabsTrigger value="report">报告</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="chart" className="flex-1 flex flex-col">
                        <div className="space-y-4 mb-6 flex-1">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>原材料</span>
                              <span className="font-medium">{results.materials} kg CO<sub>2</sub>e</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-eco-green rounded-full" 
                                style={{ width: `${(results.materials / results.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>生产过程</span>
                              <span className="font-medium">{results.production} kg CO<sub>2</sub>e</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-eco-blue rounded-full" 
                                style={{ width: `${(results.production / results.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>物流运输</span>
                              <span className="font-medium">{results.transport} kg CO<sub>2</sub>e</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-eco-darkBlue rounded-full" 
                                style={{ width: `${(results.transport / results.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>使用阶段</span>
                              <span className="font-medium">{results.usage} kg CO<sub>2</sub>e</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-400 rounded-full" 
                                style={{ width: `${(results.usage / results.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>废弃处理</span>
                              <span className="font-medium">{results.disposal} kg CO<sub>2</sub>e</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500 rounded-full" 
                                style={{ width: `${(results.disposal / results.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="table" className="flex-1">
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  阶段
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  排放量 (kg CO<sub>2</sub>e)
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  占比
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">原材料</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{results.materials}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                                  {((results.materials / results.total) * 100).toFixed(1)}%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">生产过程</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{results.production}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                                  {((results.production / results.total) * 100).toFixed(1)}%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">物流运输</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{results.transport}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                                  {((results.transport / results.total) * 100).toFixed(1)}%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">使用阶段</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{results.usage}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                                  {((results.usage / results.total) * 100).toFixed(1)}%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">废弃处理</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{results.disposal}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                                  {((results.disposal / results.total) * 100).toFixed(1)}%
                                </td>
                              </tr>
                              <tr className="bg-gray-50 font-medium">
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">总计</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{results.total}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">100%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="report" className="flex-1">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-eco-green mr-2" />
                            <h4 className="font-medium">碳足迹分析报告</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            根据您提供的数据，该产品的总碳足迹为 <strong>{results.total} kg CO<sub>2</sub>e</strong>。
                          </p>
                          <div>
                            <h5 className="text-sm font-medium mb-1">主要排放源</h5>
                            <p className="text-sm text-muted-foreground">
                              原材料阶段贡献了最大的碳排放，占总排放的{((results.materials / results.total) * 100).toFixed(1)}%。
                              建议考虑使用低碳替代材料或优化材料使用量。
                            </p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-1">减排建议</h5>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                              <li>寻找低碳原材料替代方案</li>
                              <li>提高材料利用效率，减少浪费</li>
                              <li>优化生产能源效率</li>
                              <li>选择低碳运输方式</li>
                              <li>延长产品寿命，减少废弃物产生</li>
                            </ul>
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
                )}
                
                {!hasCalculated && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <ChartPie className="h-12 w-12 text-muted mb-4" />
                    <p>输入数据并计算后，这里将显示您的产品碳足迹分析结果</p>
                  </div>
                )}
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
