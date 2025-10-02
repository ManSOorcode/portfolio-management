//portfolio data point type
export interface PortfolioDataPoint {
  date: string;
  nav: number;
  drawdown?: number;
}

// Raw portfolio data row type
export type RawPortfolioRow = {
  "Historical Mutual Fund NAV of Quant Active Fund Gr": string;
  Column2: string | number;
};

// calculation types

export type ParsedNav = {
  date: Date;
  nav: number;
};

export type Stat = {
  label: string; // e.g. "Total Return"
  value: string; // e.g. "+554.6%"
  color: string; // Tailwind class e.g. "text-green-600"
  bg: string; // Tailwind background e.g. "bg-green-50"
  icon: string; // Emoji or icon
};

export type Metric = {
  title: string; // e.g. "Volatility"
  value: string; // e.g. "15.2%"
  subtitle: string; // e.g. "Annual standard deviation" or "March 2020"
  bg: string; // Tailwind background e.g. "bg-red-50"
  icon: string; // Emoji or icon
};

export type StatsAndMetrics = {
  stats: Stat[];
  metrics: Metric[];
};

// custome tool tipe

import type { TooltipContentProps } from "recharts/types/component/Tooltip";

export type Entry = TooltipContentProps<number, string>["payload"][number];
