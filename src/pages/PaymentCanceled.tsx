
import React from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const PaymentCanceled = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <XCircle className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-eco-darkBlue mb-4">
          {t('paymentCanceled')}
        </h1>
        <p className="mb-6 text-muted-foreground">
          {t('paymentCanceled')}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild className="bg-eco-green hover:bg-eco-green/90 text-white">
            <Link to="/payment">{t('tryAgain')}</Link>
          </Button>
          <Button asChild variant="outline" className="border-eco-green text-eco-green hover:bg-eco-lightGreen">
            <Link to="/">{t('returnHome')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
