import type { TooltipContentProps } from "recharts";
import type { Entry } from "../types/types";

const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<number, string>) => {
  if (active && payload && payload.length) {
    const date = new Date(payload[0].payload.date);
    const formattedDate = `${date.getDate()}-${date.toLocaleString("default", {
      month: "short",
    })}-${date.getFullYear()}`;

    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          {formattedDate}
        </p>
        {payload.map((entry: Entry, index: number) => (
          <p
            key={index}
            className="text-sm font-semibold"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value.toFixed(2)}
            {entry.name.includes("Drawdown") ? "%" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
