
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Line, LineChart } from "recharts";

interface ResultsType {
  materials: number;
  production: number;
  transport: number;
  usage: number;
  disposal: number;
  total: number;
}

interface ResultChartsProps {
  results: ResultsType;
}

const ResultCharts = ({ results }: ResultChartsProps) => {
  // Prepare chart data
  const chartData = [
    { name: '原材料', value: results.materials, fill: '#4ade80' }, // eco-green
    { name: '生产过程', value: results.production, fill: '#60a5fa' }, // eco-blue
    { name: '物流运输', value: results.transport, fill: '#1e40af' }, // eco-darkBlue
    { name: '使用阶段', value: results.usage, fill: '#a855f7' }, // purple
    { name: '废弃处理', value: results.disposal, fill: '#eab308' }, // yellow
  ];

  // Prepare bar chart data
  const barData = [
    { name: '原材料', 排放量: results.materials },
    { name: '生产过程', 排放量: results.production },
    { name: '物流运输', 排放量: results.transport },
    { name: '使用阶段', 排放量: results.usage },
    { name: '废弃处理', 排放量: results.disposal },
  ];

  return (
    <Tabs defaultValue="pie">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="pie">饼图</TabsTrigger>
        <TabsTrigger value="bar">柱状图</TabsTrigger>
        <TabsTrigger value="line">趋势图</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pie" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} kg CO₂e`]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </TabsContent>
      
      <TabsContent value="bar" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => [`${value} kg CO₂e`, '排放量']} />
            <Legend />
            <Bar dataKey="排放量" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
      
      <TabsContent value="line" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={barData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="排放量" stroke="#4ade80" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
};

export default ResultCharts;
