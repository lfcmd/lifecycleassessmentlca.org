
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MaterialInputsProps {
  materialValues: {
    material1: number;
    material2: number;
    material3: number;
  };
  handleMaterialChange: (field: string, value: string) => void;
}

const MaterialInputs = ({ materialValues, handleMaterialChange }: MaterialInputsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="material1">主要材料 (kg)</Label>
        <Input
          id="material1"
          type="number"
          min="0"
          value={materialValues.material1}
          onChange={(e) => handleMaterialChange("material1", e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="material2">次要材料 (kg)</Label>
        <Input
          id="material2"
          type="number"
          min="0"
          value={materialValues.material2}
          onChange={(e) => handleMaterialChange("material2", e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="material3">包装材料 (kg)</Label>
        <Input
          id="material3"
          type="number"
          min="0"
          value={materialValues.material3}
          onChange={(e) => handleMaterialChange("material3", e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default MaterialInputs;
