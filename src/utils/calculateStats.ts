import type {
  Metric,
  ParsedNav,
  RawPortfolioRow,
  Stat,
  StatsAndMetrics,
} from "../types/types";

const calculateStats = (rawData: RawPortfolioRow[]): StatsAndMetrics => {
  // 1. Parse and clean data
  const parsed: ParsedNav[] = rawData
    .map((d) => {
      const dateStr = d["Historical Mutual Fund NAV of Quant Active Fund Gr"];
      const nav = parseFloat(String(d.Column2));
      const [day, month, year] = dateStr.split("-").map(Number);
      return { date: new Date(year, month - 1, day), nav };
    })
    .filter((d) => !isNaN(d.nav))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const first = parsed[0];
  const last = parsed[parsed.length - 1];
  const years =
    (last.date.getTime() - first.date.getTime()) / (1000 * 60 * 60 * 24 * 365);

  // 2. Total Return
  const totalReturn = ((last.nav - first.nav) / first.nav) * 100;

  // 3. CAGR
  const cagr = (Math.pow(last.nav / first.nav, 1 / years) - 1) * 100;

  // 4. Daily returns
  const returns: number[] = [];
  for (let i = 1; i < parsed.length; i++) {
    const r = (parsed[i].nav - parsed[i - 1].nav) / parsed[i - 1].nav;
    returns.push(r);
  }

  // Helpers
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const stdev = (arr: number[]) => {
    const m = mean(arr);
    return Math.sqrt(mean(arr.map((x) => (x - m) ** 2)));
  };

  // 5. Volatility (annualized)
  const dailyStd = stdev(returns);
  const volatility = dailyStd * Math.sqrt(252) * 100;

  // 6. Sharpe Ratio (risk free = 0)
  const avgDaily = mean(returns);
  const sharpe = (avgDaily * 252) / (dailyStd * Math.sqrt(252));

  // 7. Max Drawdown
  let peak = parsed[0].nav;
  let maxDD = 0;
  parsed.forEach((p) => {
    peak = Math.max(peak, p.nav);
    maxDD = Math.min(maxDD, (p.nav - peak) / peak);
  });

  // 8. Monthly returns (Best/Worst Month)
  const monthlyReturns: Record<string, { start: ParsedNav; end: ParsedNav }> =
    {};
  for (let i = 1; i < parsed.length; i++) {
    const ym = `${parsed[i].date.getFullYear()}-${
      parsed[i].date.getMonth() + 1
    }`;
    if (!monthlyReturns[ym])
      monthlyReturns[ym] = { start: parsed[i], end: parsed[i] };
    monthlyReturns[ym].end = parsed[i];
  }

  const monthResults = Object.entries(monthlyReturns).map(
    ([ym, { start, end }]) => ({
      ym,
      return: (end.nav - start.nav) / start.nav,
    })
  );

  const best = monthResults.reduce((a, b) => (a.return > b.return ? a : b));
  const worst = monthResults.reduce((a, b) => (a.return < b.return ? a : b));

  const formatPct = (val: number) => `${val > 0 ? "+" : ""}${val.toFixed(1)}%`;

  // Format YYYY-MM → Month YYYY
  const formatMonth = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    return new Date(y, m - 1).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // === Return stats & metrics objects ===
  const stats: Stat[] = [
    {
      label: "Total Return",
      value: formatPct(totalReturn),
      color: "text-green-600",
      bg: "bg-green-50",
      icon: "📈",
    },
    {
      label: "Annualized Return",
      value: formatPct(cagr),
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "💰",
    },
    {
      label: "Max Drawdown",
      value: formatPct(maxDD * 100),
      color: "text-red-600",
      bg: "bg-red-50",
      icon: "📉",
    },
    {
      label: "Sharpe Ratio",
      value: sharpe.toFixed(2),
      color: "text-purple-600",
      bg: "bg-purple-50",
      icon: "⚡",
    },
  ];

  const metrics: Metric[] = [
    {
      title: "Volatility",
      value: formatPct(volatility),
      subtitle: "Annual standard deviation",
      bg: "bg-blue-50",
      icon: "📊",
    },
    {
      title: "Best Month",
      value: formatPct(best.return * 100),
      subtitle: formatMonth(best.ym),
      bg: "bg-green-50",
      icon: "🎯",
    },
    {
      title: "Worst Month",
      value: formatPct(worst.return * 100),
      subtitle: formatMonth(worst.ym),
      bg: "bg-red-50",
      icon: "⚠️",
    },
  ];

  return { stats, metrics };
};

export default calculateStats;
