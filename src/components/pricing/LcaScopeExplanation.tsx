
import React from "react";

const LcaScopeExplanation: React.FC = () => {
  return (
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
  );
};

export default LcaScopeExplanation;
