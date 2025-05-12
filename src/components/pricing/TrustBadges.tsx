
import React from "react";
import { Users, FileText, ChartBar } from "lucide-react";

const TrustBadges: React.FC = () => {
  return (
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
  );
};

export default TrustBadges;
