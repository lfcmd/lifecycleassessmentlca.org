
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-eco-green" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-eco-darkBlue mb-4">
          支付成功！
        </h1>
        <p className="mb-6 text-muted-foreground">
          感谢您的购买。您的订单已经成功处理，您现在可以开始使用我们的服务了。
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild className="bg-eco-green hover:bg-eco-green/90 text-white">
            <Link to="/dashboard">进入控制台</Link>
          </Button>
          <Button asChild variant="outline" className="border-eco-green text-eco-green hover:bg-eco-lightGreen">
            <Link to="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
