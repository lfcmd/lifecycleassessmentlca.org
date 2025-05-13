
import React from "react";
import { 
  ChartBar, 
  Database, 
  FileText, 
  Leaf, 
  Settings, 
  Users 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <ChartBar className="h-10 w-10 text-eco-green p-2 bg-eco-lightGreen rounded-lg" />,
    title: "产品碳足迹计算",
    description: "基于ISO 14067标准，计算产品全生命周期的碳足迹，包括原材料获取、生产、运输、使用和废弃阶段"
  },
  {
    icon: <FileText className="h-10 w-10 text-eco-blue p-2 bg-eco-lightGray rounded-lg" />,
    title: "LCA生命周期评价",
    description: "全面评估产品生命周期的环境影响，包括温室气体排放、资源消耗、水足迹等多个环境指标"
  },
  {
    icon: <Database className="h-10 w-10 text-eco-green p-2 bg-eco-lightGreen rounded-lg" />,
    title: "丰富的排放因子数据库",
    description: "包含超过10,000个排放因子数据，覆盖各行业原材料、能源、运输和废弃物处理的排放系数"
  },
  {
    icon: <Settings className="h-10 w-10 text-eco-blue p-2 bg-eco-lightGray rounded-lg" />,
    title: "灵活的计算模型",
    description: "可根据企业需求自定义计算边界、分配方法和排放因子，确保结果的准确性和相关性"
  },
  {
    icon: <Users className="h-10 w-10 text-eco-green p-2 bg-eco-lightGreen rounded-lg" />,
    title: "多用户协作",
    description: "支持团队成员共同参与数据收集和审核，提高工作效率和数据可靠性"
  },
  {
    icon: <Leaf className="h-10 w-10 text-eco-blue p-2 bg-eco-lightGray rounded-lg" />,
    title: "环境影响改进建议",
    description: "基于计算结果提供减排热点分析和改进建议，帮助企业实现可持续发展目标"
  }
];

const carbonBenefits = [
  "提升品牌声誉和竞争力",
  "满足客户和投资者对环境数据的需求",
  "识别减排机会，降低生产成本",
  "符合国内外法规和市场准入要求",
  "助力企业实现碳中和战略目标"
];

const Features = () => {
  return (
    <section id="features" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
            专业的碳足迹计算与LCA评价功能
          </h2>
          <p className="text-lg text-muted-foreground">
            我们的平台提供全面的生命周期评价工具，帮助企业精确计算产品碳足迹，识别减排机会，实现绿色低碳发展
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md card-hover">
              <CardContent className="pt-6">
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-eco-darkBlue mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* 碳足迹计算的好处 */}
        <div className="mt-20 bg-gradient-to-r from-eco-green/10 to-eco-blue/10 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-eco-darkBlue mb-4">
                计算产品碳足迹的好处
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                了解产品的碳足迹不仅有助于环境保护，还能为企业带来实际的商业价值。通过精确的碳足迹计算，企业可以:
              </p>
              <ul className="space-y-3">
                {carbonBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-6 w-6 text-eco-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-semibold text-eco-darkBlue">支持的标准框架</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "ISO 14067", progress: "95%" },
                    { name: "PAS 2050", progress: "90%" },
                    { name: "ISO 14040&14044", progress: "100%" },
                    { name: "Product Category Rules", progress: "85%" },
                    { name: "环境产品声明(EPD)", progress: "80%" }
                  ].map((standard, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{standard.name}</span>
                        <span className="font-medium">{standard.progress}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-eco-green to-eco-blue rounded-full" 
                          style={{ width: standard.progress }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
