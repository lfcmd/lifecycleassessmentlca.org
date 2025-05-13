
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PaymentButtonProps extends Omit<ButtonProps, "onClick"> {
  priceId: string;
  label?: string;
  successUrl?: string;
  cancelUrl?: string;
  paymentMode?: "payment" | "subscription";
  children?: React.ReactNode;
}

const PaymentButton = ({
  priceId,
  label = "立即购买",
  successUrl = `/payment-success`,
  cancelUrl = `/payment-canceled`,
  paymentMode = "payment",
  children,
  className,
  ...props
}: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    
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
          successUrl: `${origin}${successUrl}`,
          cancelUrl: `${origin}${cancelUrl}`,
          paymentMode: paymentMode,
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

  return (
    <Button 
      onClick={handlePayment}
      disabled={loading}
      className={className}
      {...props}
    >
      {loading ? "处理中..." : children || label}
    </Button>
  );
};

export default PaymentButton;
