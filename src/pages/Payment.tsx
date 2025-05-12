
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ChartBar, FileText, Calculator, Users } from "lucide-react";

const pricingPlans = [
  {
    name: "基础版",
    id: "one-time-basic",
    price: "¥9,800",
    priceId: "price_1OuQUaJqIxGLUcoK5jGkDOsa", // Replace with your Stripe price ID
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
    id: "one-time-pro",
    price: "¥29,800",
    priceId: "price_1OuQUyJqIxGLUcoKsqF6jOUz", // Replace with your Stripe price ID
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
    id: "one-time-enterprise",
    price: "¥69,800",
    priceId: "price_1OuQVJJqIxGLUcoKiUUEN56S", // Replace with your Stripe price ID
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

const subscriptionPlans = [
  {
    name: "基础月度订阅",
    id: "sub-basic",
    price: "¥1,980",
    priceId: "price_1OuQVwJqIxGLUcoKyGae2O0c", // Replace with your Stripe subscription price ID
    description: "适合小型企业和初创企业",
    features: [
      "每月单个产品碳足迹计算",
      "基本的排放因子数据库",
      "PDF格式报告",
      "邮件技术支持"
    ],
    icon: <Calculator className="h-8 w-8 text-eco-green" />
  },
  {
    name: "专业月度订阅",
    id: "sub-pro",
    price: "¥4,980",
    priceId: "price_1OuQWSJqIxGLUcoKi1OLyHPi", // Replace with your Stripe subscription price ID
    description: "适合中型企业",
    features: [
      "每月最多5个产品碳足迹计算",
      "扩展的排放因子数据库",
      "PDF和Excel格式报告",
      "热点分析和减排建议",
      "优先技术支持"
    ],
    highlighted: true,
    icon: <ChartBar className="h-8 w-8 text-white" />
  },
  {
    name: "企业月度订阅",
    id: "sub-enterprise",
    price: "¥9,980",
    priceId: "price_1OuQWvJqIxGLUcoKP7XsmeBu", // Replace with your Stripe subscription price ID
    description: "适合大型企业",
    features: [
      "每月无限产品碳足迹计算",
      "完整的排放因子数据库",
      "自定义报告和数据导出",
      "热点分析和减排路径规划",
      "专属客户经理",
      "定期线上培训和支持"
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
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
            选择适合您的服务方案
          </h1>
          <p className="text-lg text-muted-foreground">
            我们提供多种灵活的支付选项，满足您的不同需求
          </p>
        </div>
        
        <Tabs defaultValue="one-time" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md mx-auto">
            <TabsTrigger value="one-time">一次性服务</TabsTrigger>
            <TabsTrigger value="subscription">订阅服务</TabsTrigger>
          </TabsList>
          
          <TabsContent value="one-time">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border ${plan.highlighted ? 'relative border-eco-green shadow-lg' : 'shadow-md'} card-hover`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-eco-green text-white text-sm font-medium py-1 px-3 rounded-full">
                        最受欢迎
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
                      <span className="text-muted-foreground ml-1">一次性</span>
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
          
          <TabsContent value="subscription">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subscriptionPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border ${plan.highlighted ? 'relative border-eco-green shadow-lg' : 'shadow-md'} card-hover`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-eco-green text-white text-sm font-medium py-1 px-3 rounded-full">
                        最受欢迎
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
                      <span className="text-muted-foreground ml-1">/月</span>
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
                      onClick={() => handlePayment(plan.priceId, plan.id, true)}
                      disabled={loading === plan.id}
                    >
                      {loading === plan.id ? "处理中..." : "订阅此方案"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
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
              <span>7天退款保证</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-eco-green" />
              <span>专业技术支持</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
