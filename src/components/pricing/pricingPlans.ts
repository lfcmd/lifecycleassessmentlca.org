
import React from "react";
import { Calculator, ChartBar, LineChart, FileText } from "lucide-react";
import { PricingPlanType } from "./types";

export const simpleLCAPlans: PricingPlanType[] = [
  {
    name: "碳足迹基础版 (简单产品)",
    id: "simple-carbon-basic-simple",
    price: "$59",
    priceId: "price_1OuQUaJqIxGLUcoK5jGkDOsa", // Replace with actual Stripe price ID
    description: "单个简单产品碳足迹分析",
    features: [
      "单个产品碳足迹计算",
      "摇篮到大门范围",
      "Excel格式结果",
      "结果图表展示",
      "5天内发送结果到邮箱"
    ],
    icon: React.createElement(Calculator, { className: "h-8 w-8 text-eco-green" })
  },
  {
    name: "碳足迹基础版 (复杂产品)",
    id: "simple-carbon-basic-complex",
    price: "$79",
    priceId: "price_1OuQUyJqIxGLUcoKsqF6jOUz", // Replace with actual Stripe price ID
    description: "单个复杂产品碳足迹分析",
    features: [
      "单个产品碳足迹计算",
      "摇篮到大门范围",
      "Excel格式结果",
      "结果图表展示",
      "5天内发送结果到邮箱"
    ],
    icon: React.createElement(Calculator, { className: "h-8 w-8 text-eco-green" })
  },
  {
    name: "环境足迹基础版 (简单产品)",
    id: "simple-env-basic-simple",
    price: "$79",
    priceId: "price_1OuQVJJqIxGLUcoKiUUEN56S", // Replace with actual Stripe price ID
    description: "单个简单产品环境足迹分析",
    features: [
      "碳足迹及其他环境指标",
      "摇篮到大门范围",
      "Excel格式结果",
      "结果图表展示",
      "5天内发送结果到邮箱"
    ],
    icon: React.createElement(ChartBar, { className: "h-8 w-8 text-eco-blue" })
  },
  {
    name: "环境足迹基础版 (复杂产品)",
    id: "simple-env-basic-complex",
    price: "$99",
    priceId: "price_1OuQVwJqIxGLUcoKyGae2O0c", // Replace with actual Stripe price ID
    description: "单个复杂产品环境足迹分析",
    features: [
      "碳足迹及其他环境指标",
      "摇篮到大门范围",
      "Excel格式结果",
      "结果图表展示",
      "5天内发送结果到邮箱"
    ],
    icon: React.createElement(ChartBar, { className: "h-8 w-8 text-eco-blue" })
  },
  {
    name: "碳足迹升级版",
    id: "simple-carbon-premium",
    price: "$129",
    priceId: "price_1OuQWSJqIxGLUcoKi1OLyHPi", // Replace with actual Stripe price ID
    description: "碳足迹深度分析",
    features: [
      "单个产品碳足迹计算",
      "摇篮到大门范围",
      "Excel格式结果与图表",
      "详细分析报告",
      "热点分析和减排建议",
      "技术支持服务"
    ],
    highlighted: true,
    icon: React.createElement(ChartBar, { className: "h-8 w-8 text-white" })
  },
  {
    name: "环境足迹升级版",
    id: "simple-env-premium",
    price: "$179",
    priceId: "price_1OuQWvJqIxGLUcoKP7XsmeBu", // Replace with actual Stripe price ID
    description: "全面环境足迹分析",
    features: [
      "产品环境足迹计算",
      "摇篮到大门范围",
      "Excel格式结果与图表",
      "详细分析报告",
      "热点分析和减排建议",
      "技术支持服务"
    ],
    icon: React.createElement(LineChart, { className: "h-8 w-8 text-eco-green" })
  }
];

export const detailLCAPlans: PricingPlanType[] = [
  {
    name: "Detail LCA",
    id: "detail-lca",
    price: "$887",
    priceId: "price_1OuQXQJqIxGLUcoK2YGD5mIB", // Replace with actual Stripe price ID
    description: "全生命周期深度分析",
    features: [
      "产品碳足迹或环境足迹",
      "摇篮到坟墓全生命周期",
      "详细分析报告",
      "热点分析与减排路径",
      "全面技术支持",
      "项目管理服务"
    ],
    icon: React.createElement(FileText, { className: "h-8 w-8 text-eco-blue" })
  }
];
