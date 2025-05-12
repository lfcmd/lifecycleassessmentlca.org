
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ChartBar, FileText, Calculator, Users, LineChart } from "lucide-react";

const simpleLCAPlans = [
  {
    name: "碳足迹基础版 (简单产品)",
    id: "simple-carbon-basic-simple",
    price: "$59",
    priceId: "price_1OuQUaJqIxGLUcoK5jGkDOsa", // Replace with your Stripe price ID
    description: "单个简单产品碳足迹分析",
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
    name: "碳足迹基础版 (复杂产品)",
    id: "simple-carbon-basic-complex",
    price: "$79",
    priceId: "price_1OuQUyJqIxGLUcoKsqF6jOUz", // Replace with your Stripe price ID
    description: "单个复杂产品碳足迹分析",
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
    name: "环境足迹基础版 (简单产品)",
    id: "simple-env-basic-simple",
    price: "$79",
    priceId: "price_1OuQVJJqIxGLUcoKiUUEN56S", // Replace with your Stripe price ID
    description: "单个简单产品环境足迹分析",
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
    name: "环境足迹基础版 (复杂产品)",
    id: "simple-env-basic-complex",
    price: "$99",
    priceId: "price_1OuQVwJqIxGLUcoKyGae2O0c", // Replace with your Stripe price ID
    description: "单个复杂产品环境足迹分析",
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
    id: "simple-carbon-premium",
    price: "$129",
    priceId: "price_1OuQWSJqIxGLUcoKi1OLyHPi", // Replace with your Stripe price ID
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
    id: "simple-env-premium",
    price: "$179",
    priceId: "price_1OuQWvJqIxGLUcoKP7XsmeBu", // Replace with your Stripe price ID
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
    id: "detail-lca",
    price: "$887",
    priceId: "price_1OuQWSJqIxGLUcoKi1OLyHPi", // Replace with your Stripe price ID
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

const Payment = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handlePayment = async (priceId: string, planId: string, isSubscription: boolean) => {
    setLoading(planId);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "请先登录",
          description: "您需要登录后才能进行支付",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      
      // Determine the current URL for success/cancel redirects
      const origin = window.location.origin;
      
      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: {
          priceId: priceId,
          successUrl: `${origin}/payment-success`,
          cancelUrl: `${origin}/payment-canceled`,
          paymentMode: isSubscription ? "subscription" : "payment",
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
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
            选择适合您的服务方案
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            我们提供多种LCA分析服务，满足您的不同需求
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
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
        
        <Tabs defaultValue="simple-lca" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md mx-auto">
            <TabsTrigger value="simple-lca">Simple LCA</TabsTrigger>
            <TabsTrigger value="detail-lca">Detail LCA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple-lca">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simpleLCAPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border ${plan.highlighted ? 'relative border-eco-green shadow-lg' : 'shadow-md'} card-hover`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-eco-green text-white text-sm font-medium py-1 px-3 rounded-full">
                        推荐方案
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full ${plan.highlighted ? 'bg-eco-green' : 'bg-eco-lightGray'}`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-eco-darkBlue text-center">{plan.name}</CardTitle>
                    <CardDescription className="text-center">
                      <span className="text-3xl font-bold text-eco-darkBlue">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">/产品</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-eco-green hover:bg-eco-green/90 text-white' : 'bg-white border border-eco-green text-eco-green hover:bg-eco-lightGreen'}`}
                      onClick={() => handlePayment(plan.priceId, plan.id, false)}
                      disabled={loading === plan.id}
                    >
                      {loading === plan.id ? "处理中..." : "选择此方案"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="detail-lca">
            <div className="max-w-md mx-auto">
              {detailLCAPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className="border shadow-lg card-hover"
                >
                  <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-eco-lightGray">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-eco-darkBlue text-center">{plan.name}</CardTitle>
                    <CardDescription className="text-center">
                      <span className="text-3xl font-bold text-eco-darkBlue">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">/产品</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
                      onClick={() => handlePayment(plan.priceId, plan.id, false)}
                      disabled={loading === plan.id}
                    >
                      {loading === plan.id ? "处理中..." : "选择此方案"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 max-w-3xl mx-auto mt-16 mb-12">
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

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            需要更多定制化服务？请与我们联系获取专属解决方案
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-eco-green" />
              <span>安全支付</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-eco-green" />
              <span>专业分析团队</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-eco-green" />
              <span>全程技术支持</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
