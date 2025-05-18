
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

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
  label,
  successUrl = `/payment-success`,
  cancelUrl = `/payment-canceled`,
  paymentMode = "payment",
  children,
  className,
  ...props
}: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: t('loginFailed'),
          description: t('loginFailed'),
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
          title: t('paymentCanceled'),
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
          title: t('paymentCanceled'),
          description: t('paymentCanceled'),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: t('paymentCanceled'),
        description: t('paymentCanceled'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const defaultLabel = t('selectService');

  return (
    <Button 
      onClick={handlePayment}
      disabled={loading}
      className={className}
      {...props}
    >
      {loading ? t('processing') : children || label || defaultLabel}
    </Button>
  );
};

export default PaymentButton;
