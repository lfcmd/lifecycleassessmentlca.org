
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransportInputsProps {
  transportValues: {
    distance: number;
    method: string;
  };
  handleTransportChange: (field: string, value: string | number) => void;
}

const TransportInputs = ({ transportValues, handleTransportChange }: TransportInputsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="distance">运输距离 (km)</Label>
        <Input
          id="distance"
          type="number"
          min="0"
          value={transportValues.distance}
          onChange={(e) => handleTransportChange("distance", e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="transport-method">运输方式</Label>
        <Select 
          value={transportValues.method as string}
          onValueChange={(value) => handleTransportChange("method", value)}
        >
          <SelectTrigger id="transport-method" className="mt-1">
            <SelectValue placeholder="选择运输方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="truck">卡车</SelectItem>
            <SelectItem value="ship">船舶</SelectItem>
            <SelectItem value="air">航空</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TransportInputs;
