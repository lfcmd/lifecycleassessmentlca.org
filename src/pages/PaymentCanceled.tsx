
import React from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <XCircle className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-eco-darkBlue mb-4">
          支付已取消
        </h1>
        <p className="mb-6 text-muted-foreground">
          您的支付过程已被取消。如果您遇到任何问题，请随时联系我们的客户支持团队获取帮助。
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild className="bg-eco-green hover:bg-eco-green/90 text-white">
            <Link to="/payment">重新选择方案</Link>
          </Button>
          <Button asChild variant="outline" className="border-eco-green text-eco-green hover:bg-eco-lightGreen">
            <Link to="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
