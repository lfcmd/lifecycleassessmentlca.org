
import { ReactNode } from "react";

export interface IconType {
  className?: string;
}

export interface PricingPlanType {
  name: string;
  id: string;
  price: string;
  priceId: string;
  description: string;
  features: string[];
  icon: ReactNode;
  highlighted?: boolean;
}
