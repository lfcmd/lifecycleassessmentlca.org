
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ChartBar, FileText, Calculator, Users } from "lucide-react";

const pricingPlans = [
  {
    name: "基础版",
    price: "¥9,800",
    description: "适合小型企业和单个产品",
    features: [
      "单个产品碳足迹计算",
      "基本的排放因子数据库",
      "PDF格式报告",
      "邮件技术支持"
    ],
    icon: <Calculator className="h-8 w-8 text-eco-green" />
  },
  {
    name: "专业版",
    price: "¥29,800",
    description: "适合中型企业和多个产品",
    features: [
      "最多10个产品碳足迹计算",
      "扩展的排放因子数据库",
      "PDF和Excel格式报告",
      "热点分析和减排建议",
      "优先技术支持"
    ],
    highlighted: true,
    icon: <ChartBar className="h-8 w-8 text-white" />
  },
  {
    name: "企业版",
    price: "¥69,800",
    description: "适合大型企业和产品组合",
    features: [
      "无限产品碳足迹计算",
      "完整的排放因子数据库",
      "自定义报告和数据导出",
      "热点分析和减排路径规划",
      "专属客户经理",
      "现场培训和支持"
    ],
    icon: <FileText className="h-8 w-8 text-eco-blue" />
  }
];

const Contact = () => {
  return (
    <>
      <section id="pricing" className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
              服务套餐与价格
            </h2>
            <p className="text-lg text-muted-foreground">
              选择最适合您企业需求的碳足迹计算和LCA评估方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border ${plan.highlighted ? 'relative border-eco-green shadow-lg' : 'shadow-md'} card-hover`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-eco-green text-white text-sm font-medium py-1 px-3 rounded-full">
                      最受欢迎
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
                    <span className="text-muted-foreground">/年</span>
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
                    className={`w-full ${plan.highlighted ? 'bg-eco-green hover:bg-eco-green/90 text-white' : 'bg-white border border-eco-green text-eco-green hover:bg-eco-lightGreen'}`}
                  >
                    选择此方案
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-eco-green" />
              <span>团队协作功能</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-eco-green" />
              <span>详细的报告导出</span>
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
            <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-lightGreen">
              联系我们获取定制方案
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
                    <p className="text-muted-foreground">+86 400-123-4567</p>
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
                    <p className="text-muted-foreground">contact@lcacalc.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-eco-lightGreen p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-eco-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-eco-darkBlue mb-1">办公地址</h3>
                    <p className="text-muted-foreground">上海市浦东新区张江高科技园区博云路2号</p>
                  </div>
                </div>
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
