
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import PricingPlan from "@/components/pricing/PricingPlan";
import LcaScopeExplanation from "@/components/pricing/LcaScopeExplanation";
import ServiceProcess from "@/components/pricing/ServiceProcess";
import TrustBadges from "@/components/pricing/TrustBadges";
import { simpleLCAPlans, detailLCAPlans } from "@/components/pricing/pricingPlans";

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
          
          <LcaScopeExplanation />
        </div>
        
        <Tabs defaultValue="simple-lca" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md mx-auto">
            <TabsTrigger value="simple-lca">Simple LCA</TabsTrigger>
            <TabsTrigger value="detail-lca">Detail LCA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple-lca">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simpleLCAPlans.map((plan) => (
                <PricingPlan
                  key={plan.id}
                  {...plan}
                  onSelectPlan={handlePayment}
                  loading={loading}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="detail-lca">
            <div className="max-w-md mx-auto">
              {detailLCAPlans.map((plan) => (
                <PricingPlan
                  key={plan.id}
                  {...plan}
                  onSelectPlan={handlePayment}
                  loading={loading}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <ServiceProcess />

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            需要更多定制化服务？请与我们联系获取专属解决方案
          </p>
          <TrustBadges />
        </div>
      </div>
    </div>
  );
};

export default Payment;
