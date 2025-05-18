
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ChartBar, FileText, Calculator, Users, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const simpleLCAPlans = [
  {
    name: "碳足迹基础版",
    price: "$59-$79",
    description: "简单/复杂产品",
    features: [
      "单个产品碳足迹计算",
      "摇篮到大门范围",
      "Excel格式结果",
      "结果图表展示",
      "5天内发送结果到邮箱"
    ],
    icon: <Calculator className="h-8 w-8 text-eco-green" />
  },
  {
    name: "环境足迹基础版",
    price: "$79-$99",
    description: "简单/复杂产品",
    features: [
      "碳足迹及其他环境指标",
      "摇篮到大门范围",
      "Excel格式结果",
      "结果图表展示",
      "5天内发送结果到邮箱"
    ],
    icon: <ChartBar className="h-8 w-8 text-eco-blue" />
  },
  {
    name: "碳足迹升级版",
    price: "$129",
    description: "碳足迹深度分析",
    features: [
      "单个产品碳足迹计算",
      "摇篮到大门范围",
      "Excel格式结果与图表",
      "详细分析报告",
      "热点分析和减排建议",
      "技术支持服务"
    ],
    highlighted: true,
    icon: <ChartBar className="h-8 w-8 text-white" />
  },
  {
    name: "环境足迹升级版",
    price: "$179",
    description: "全面环境足迹分析",
    features: [
      "产品环境足迹计算",
      "摇篮到大门范围",
      "Excel格式结果与图表",
      "详细分析报告",
      "热点分析和减排建议",
      "技术支持服务"
    ],
    icon: <LineChart className="h-8 w-8 text-eco-green" />
  }
];

const detailLCAPlans = [
  {
    name: "Detail LCA",
    price: "$887",
    description: "全生命周期深度分析",
    features: [
      "产品碳足迹或环境足迹",
      "摇篮到坟墓全生命周期",
      "详细分析报告",
      "热点分析与减排路径",
      "全面技术支持",
      "项目管理服务"
    ],
    icon: <FileText className="h-8 w-8 text-eco-blue" />
  }
];

const Contact = () => {
  return (
    <>
      <section id="pricing" className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
              服务套餐与价格
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              选择最适合您企业需求的碳足迹计算和LCA评估方案
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-eco-darkBlue mb-3">LCA评估范围说明</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-eco-lightGreen rounded-lg">
                  <p className="font-medium mb-1">摇篮到大门</p>
                  <p className="text-muted-foreground">
                    涵盖产品原材料获取和生产阶段的环境影响，适合初步评估和产品优化。
                  </p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <p className="font-medium mb-1">摇篮到坟墓</p>
                  <p className="text-muted-foreground">
                    涵盖产品全生命周期(原材料、生产、使用、报废)的环境影响，提供全面的可持续性评估。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="simple" className="mb-8">
            <TabsList className="grid grid-cols-2 mb-6 w-full max-w-md mx-auto">
              <TabsTrigger value="simple">Simple LCA</TabsTrigger>
              <TabsTrigger value="detail">Detail LCA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simple">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {simpleLCAPlans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className={`border ${plan.highlighted ? 'relative border-eco-green shadow-lg' : 'shadow-md'} card-hover`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <span className="bg-eco-green text-white text-sm font-medium py-1 px-3 rounded-full">
                          推荐方案
                        </span>
                      </div>
                    )}
                    <CardContent className={`pt-6 ${plan.highlighted ? 'pb-8' : 'pb-6'}`}>
                      <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full ${plan.highlighted ? 'bg-eco-green' : 'bg-eco-lightGray'}`}>
                        {plan.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-eco-darkBlue text-center mb-2">{plan.name}</h3>
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-eco-darkBlue">{plan.price}</span>
                        <span className="text-muted-foreground">/产品</span>
                      </div>
                      <p className="text-center text-muted-foreground mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="h-5 w-5 text-eco-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        asChild
                        className={`w-full ${plan.highlighted ? 'bg-eco-green hover:bg-eco-green/90 text-white' : 'bg-white border border-eco-green text-eco-green hover:bg-eco-lightGreen'}`}
                      >
                        <Link to="/payment">选择此方案</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="detail">
              <div className="max-w-md mx-auto">
                {detailLCAPlans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className="border shadow-lg card-hover"
                  >
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-eco-lightGray">
                        {plan.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-eco-darkBlue text-center mb-2">{plan.name}</h3>
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-eco-darkBlue">{plan.price}</span>
                        <span className="text-muted-foreground">/产品</span>
                      </div>
                      <p className="text-center text-muted-foreground mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="h-5 w-5 text-eco-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        asChild
                        className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
                      >
                        <Link to="/payment">选择此方案</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 max-w-3xl mx-auto mb-12">
            <h3 className="font-semibold text-eco-darkBlue mb-4 text-center">服务流程</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-eco-lightGreen bg-opacity-30 rounded-lg">
                <h4 className="font-medium mb-2">基础版服务流程</h4>
                <ol className="space-y-2 text-sm pl-5 list-decimal">
                  <li>选择并支付相应服务</li>
                  <li>填写产品基本信息</li>
                  <li>我们团队进行分析</li>
                  <li>5个工作日内将Excel结果和图表发送至您的邮箱</li>
                </ol>
              </div>
              <div className="p-4 bg-eco-lightGreen bg-opacity-30 rounded-lg">
                <h4 className="font-medium mb-2">升级版/Detail版服务流程</h4>
                <ol className="space-y-2 text-sm pl-5 list-decimal">
                  <li>选择并支付相应服务</li>
                  <li>我们发送数据收集表至您的邮箱</li>
                  <li>提供技术支持，协助数据收集</li>
                  <li>开始项目并定期沟通进展</li>
                  <li>交付最终报告和分析结果</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-eco-green" />
              <span>专业团队支持</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-eco-green" />
              <span>详细的分析报告</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-eco-green" />
              <span>数据可视化分析</span>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              需要更多定制化服务？我们也提供完全定制的解决方案
            </p>
            <Button asChild variant="outline" className="border-eco-green text-eco-green hover:bg-eco-lightGreen">
              <Link to="/payment">查看所有支付选项</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
                开始您的可持续发展之旅
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                了解我们如何帮助您的企业计算产品碳足迹，实现低碳转型和可持续发展目标
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-eco-lightGreen p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-eco-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-eco-darkBlue mb-1">联系电话</h3>
                    <p className="text-muted-foreground">+86 14749944631</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-eco-lightGreen p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-eco-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-eco-darkBlue mb-1">电子邮箱</h3>
                    <p className="text-muted-foreground">fan405141@gmail.com</p>
                  </div>
                </div>
            
            <div>
              <Card className="border shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-eco-darkBlue mb-6">联系我们</h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">姓名</Label>
                        <Input id="name" className="mt-1" placeholder="您的姓名" />
                      </div>
                      <div>
                        <Label htmlFor="company">公司</Label>
                        <Input id="company" className="mt-1" placeholder="公司名称" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">电子邮箱</Label>
                      <Input id="email" type="email" className="mt-1" placeholder="your@example.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">电话</Label>
                      <Input id="phone" className="mt-1" placeholder="您的联系电话" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">留言</Label>
                      <Textarea 
                        id="message" 
                        className="mt-1" 
                        placeholder="请告诉我们您的需求或问题"
                        rows={4}
                      />
                    </div>
                    
                    <Button className="w-full bg-eco-green hover:bg-eco-green/90 text-white">
                      提交
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
