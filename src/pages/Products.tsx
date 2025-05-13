
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PaymentButton from "@/components/payment/PaymentButton";

const Products = () => {
  const products = [
    {
      id: "carbon-basic",
      name: "碳足迹基础版",
      description: "对单个产品进行基本碳足迹分析，提供简单的Excel报告和减排建议",
      price: "¥399",
      features: [
        "单个产品碳足迹评估",
        "主要排放源识别",
        "基本减排方向建议",
        "Excel格式报告",
        "5个工作日完成",
      ],
      priceId: "price_1OuQUaJqIxGLUcoK5jGkDOsa",
    },
    {
      id: "carbon-premium",
      name: "碳足迹高级版",
      description: "详细的产品生命周期碳足迹分析，包含全面的减排方案和实施建议",
      price: "¥899",
      features: [
        "详细生命周期评估",
        "排放热点细致分析",
        "行业基准比较",
        "具体减排措施建议",
        "PDF详细报告",
        "3个工作日完成",
      ],
      priceId: "price_1OuQWSJqIxGLUcoKi1OLyHPi",
      highlighted: true,
    },
    {
      id: "env-premium",
      name: "环境足迹全面版",
      description: "全面评估产品环境足迹，包括碳足迹、水足迹和其他环境影响",
      price: "¥1299",
      features: [
        "碳足迹分析",
        "水足迹分析",
        "其他环境影响评估",
        "多维减排方案",
        "可视化数据展示",
        "环境标签准备支持",
      ],
      priceId: "price_1OuQVwJqIxGLUcoKyGae2O0c",
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-eco-darkBlue mb-4">
            碳足迹评估服务
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            选择适合您需求的碳足迹评估服务，助力企业可持续发展并提升品牌价值
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`border ${
                product.highlighted
                  ? "shadow-lg border-eco-green relative"
                  : "shadow"
              }`}
            >
              {product.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-eco-green text-white text-sm font-medium py-1 px-3 rounded-full">
                    推荐服务
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-eco-darkBlue">
                  {product.name}
                </CardTitle>
                <div className="mt-2 text-2xl font-bold text-eco-darkBlue">
                  {product.price}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-eco-green flex-shrink-0 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <PaymentButton
                  priceId={product.priceId}
                  className={`w-full ${
                    product.highlighted
                      ? "bg-eco-green hover:bg-eco-green/90 text-white"
                      : "bg-white border border-eco-green text-eco-green hover:bg-eco-lightGreen"
                  }`}
                >
                  选择服务
                </PaymentButton>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-eco-darkBlue mb-4">
            需要定制服务？
          </h2>
          <p className="text-muted-foreground mb-6">
            针对多个产品或特殊行业需求，我们提供定制化碳足迹评估解决方案
          </p>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="border-eco-green text-eco-green hover:bg-eco-lightGreen"
              asChild
            >
              <Link to="/contact">联系我们获取报价</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
