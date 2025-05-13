
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartPie, CreditCard, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ResultsType {
  materials: number;
  production: number;
  transport: number;
  usage: number;
  disposal: number;
  total: number;
}

interface AnalysisPanelProps {
  hasCalculated: boolean;
  results: ResultsType;
  chartData: Array<{ name: string; value: number; fill: string }>;
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
  handlePurchaseReport,
  loading
}: AnalysisPanelProps) => {
  // Emission reduction potentials (example data)
  const reductionPotentials = [
    { category: '原材料', potential: 25, description: '选择低碳替代材料' },
    { category: '生产过程', potential: 15, description: '提高能源效率' },
    { category: '物流运输', potential: 30, description: '优化运输路线和方式' },
    { category: '使用阶段', potential: 10, description: '提升产品能效' },
    { category: '废弃处理', potential: 20, description: '实施回收再利用' },
  ];

  return (
    <>
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
      
      {hasCalculated && (
        <div className="mt-4">
          <Card className="border border-eco-green shadow-md">
            <div className="pt-4 pb-4 px-6">
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
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default AnalysisPanel;
