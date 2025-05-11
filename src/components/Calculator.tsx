
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartPie, Calculator as CalculatorIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Calculator = () => {
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
                
                {hasCalculated ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-4 mb-6">
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
                            className="h-full bg-eco-gray rounded-full" 
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
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            注意：此计算器仅供演示，实际碳足迹计算需考虑更多因素和更准确的排放因子
          </p>
          <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-lightGreen">
            了解专业碳足迹计算服务
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
