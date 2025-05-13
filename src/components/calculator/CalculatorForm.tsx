
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon } from "lucide-react";
import MaterialInputs from "./MaterialInputs";
import EnergyInputs from "./EnergyInputs";
import TransportInputs from "./TransportInputs";

interface CalculatorFormProps {
  materialValues: {
    material1: number;
    material2: number;
    material3: number;
  };
  energyValues: {
    electricity: number;
    naturalGas: number;
  };
  transportValues: {
    distance: number;
    method: string;
  };
  handleMaterialChange: (field: string, value: string) => void;
  handleEnergyChange: (field: string, value: string) => void;
  handleTransportChange: (field: string, value: string | number) => void;
  calculateFootprint: () => void;
}

const CalculatorForm = ({
  materialValues,
  energyValues,
  transportValues,
  handleMaterialChange,
  handleEnergyChange,
  handleTransportChange,
  calculateFootprint
}: CalculatorFormProps) => {
  return (
    <>
      <Tabs defaultValue="materials">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="materials">原材料</TabsTrigger>
          <TabsTrigger value="energy">能源消耗</TabsTrigger>
          <TabsTrigger value="transport">物流运输</TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials" className="space-y-6">
          <MaterialInputs 
            materialValues={materialValues} 
            handleMaterialChange={handleMaterialChange} 
          />
        </TabsContent>
        
        <TabsContent value="energy" className="space-y-6">
          <EnergyInputs 
            energyValues={energyValues} 
            handleEnergyChange={handleEnergyChange} 
          />
        </TabsContent>
        
        <TabsContent value="transport" className="space-y-6">
          <TransportInputs 
            transportValues={transportValues} 
            handleTransportChange={handleTransportChange} 
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Button 
          className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
          onClick={calculateFootprint}
        >
          <CalculatorIcon className="mr-2 h-4 w-4" />
          计算碳足迹
        </Button>
      </div>
    </>
  );
};

export default CalculatorForm;
