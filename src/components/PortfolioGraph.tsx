import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import rawData from "../data/portfolioData.json";
import type { PortfolioDataPoint, RawPortfolioRow } from "../types/types";

const PortfolioGraph = () => {
  const [data, setData] = useState<PortfolioDataPoint[]>([]);

  // Format date "DD-MM-YYYY" → "YYYY-MM-DD"
  const formatDate = (d: string): string => {
    const [day, month, year] = d.split("-");
    return `${year}-${month}-${day}`;
  };

  // Clean raw data
  const cleanData = (raw: RawPortfolioRow[]): PortfolioDataPoint[] => {
    return raw
      .filter((row) => row.Column2)
      .map((row) => ({
        date: formatDate(
          row["Historical Mutual Fund NAV of Quant Active Fund Gr"]
        ),
        nav: Number(row.Column2),
      }))
      .reverse();
  };

  const addDrawdown = (data: PortfolioDataPoint[]): PortfolioDataPoint[] => {
    let peak = data[0]?.nav || 0;
    return data.map((point) => {
      if (point.nav > peak) peak = point.nav;
      return {
        ...point,
        drawdown: ((point.nav - peak) / peak) * 100,
      };
    });
  };

  useEffect(() => {
    const cleaned = cleanData(rawData);
    const finalData = addDrawdown(cleaned);
    setData(finalData);
  }, []);

  const formatXAxisDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString("default", { month: "short" })}-${date
      .getFullYear()
      .toString()
      .slice(2)}`;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Net Asset Value (NAV)
          </h3>
          <div className="text-sm text-gray-500">
            Current:{" "}
            <span className="font-bold text-blue-600">
              ₹{data[data.length - 1]?.nav.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <LineChart width={900} height={450} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxisDate}
              interval={Math.floor(data.length / 12)}
              angle={-45}
              textAnchor="end"
              height={80}
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 20", "dataMax + 20"]}
            />
            <Tooltip content={CustomTooltip} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="nav"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={false}
              name="NAV"
              animationDuration={1000}
            />
          </LineChart>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Drawdown Analysis (%)
          </h3>
          <div className="text-sm text-gray-500">
            Max DD:{" "}
            <span className="font-bold text-red-600">
              {Math.min(...data.map((d) => d.drawdown || 0)).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <AreaChart width={900} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxisDate}
              interval={Math.floor(data.length / 12)}
              angle={-45}
              textAnchor="end"
              height={80}
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#ef4444"
              fill="#fee2e2"
              name="Drawdown"
              animationDuration={1000}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default PortfolioGraph;
