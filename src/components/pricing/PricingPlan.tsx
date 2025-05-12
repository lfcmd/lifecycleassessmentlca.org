
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IconType } from "./types";

interface PricingPlanProps {
  id: string;
  name: string;
  price: string;
  priceId: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  highlighted?: boolean;
  onSelectPlan: (priceId: string, planId: string, isSubscription: boolean) => void;
  loading: string | null;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  id,
  name,
  price,
  priceId,
  description,
  features,
  icon,
  highlighted = false,
  onSelectPlan,
  loading
}) => {
  return (
    <Card 
      className={`border ${highlighted ? 'relative border-eco-green shadow-lg' : 'shadow-md'} card-hover h-full flex flex-col`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-eco-green text-white text-sm font-medium py-1 px-3 rounded-full">
            推荐方案
          </span>
        </div>
      )}
      <CardContent className="flex-grow pt-6">
        <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full ${highlighted ? 'bg-eco-green' : 'bg-eco-lightGray'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-eco-darkBlue text-center">{name}</h3>
        <div className="text-center my-3">
          <span className="text-3xl font-bold text-eco-darkBlue">{price}</span>
          <span className="text-muted-foreground ml-1">/产品</span>
        </div>
        <p className="text-center text-muted-foreground mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg className="h-5 w-5 text-eco-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${highlighted ? 'bg-eco-green hover:bg-eco-green/90 text-white' : 'bg-white border border-eco-green text-eco-green hover:bg-eco-lightGreen'}`}
          onClick={() => onSelectPlan(priceId, id, false)}
          disabled={loading === id}
        >
          {loading === id ? "处理中..." : "选择此方案"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingPlan;
