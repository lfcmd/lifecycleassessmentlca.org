
import React from "react";

const ServiceProcess: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 max-w-3xl mx-auto mt-16 mb-12">
      <h3 className="font-semibold text-eco-darkBlue mb-6 text-center">服务流程</h3>
      
      {/* Visual Process Flow */}
      <div className="flex flex-col md:flex-row justify-between mb-8 relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-eco-lightGreen -z-10"></div>
        
        {/* Basic Service Process Steps */}
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-eco-green text-white flex items-center justify-center font-bold mb-2">1</div>
          <p className="text-sm text-center">选择并支付<br />相应服务</p>
        </div>
        
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-eco-green text-white flex items-center justify-center font-bold mb-2">2</div>
          <p className="text-sm text-center">填写产品<br />基本信息</p>
        </div>
        
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-eco-green text-white flex items-center justify-center font-bold mb-2">3</div>
          <p className="text-sm text-center">我们团队<br />进行分析</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-eco-green text-white flex items-center justify-center font-bold mb-2">4</div>
          <p className="text-sm text-center">5个工作日内<br />发送结果</p>
        </div>
      </div>
      
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
            <li>我们发送信息及数据收集表至您的邮箱</li>
            <li>提供技术支持，协助数据收集</li>
            <li>开始项目并定期沟通进展</li>
            <li>交付最终报告和分析结果</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ServiceProcess;
