
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EnergyInputsProps {
  energyValues: {
    electricity: number;
    naturalGas: number;
  };
  handleEnergyChange: (field: string, value: string) => void;
}

const EnergyInputs = ({ energyValues, handleEnergyChange }: EnergyInputsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="electricity">电力消耗 (kWh)</Label>
        <Input
          id="electricity"
          type="number"
          min="0"
          value={energyValues.electricity}
          onChange={(e) => handleEnergyChange("electricity", e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="naturalGas">天然气消耗 (m³)</Label>
        <Input
          id="naturalGas"
          type="number"
          min="0"
          value={energyValues.naturalGas}
          onChange={(e) => handleEnergyChange("naturalGas", e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default EnergyInputs;
