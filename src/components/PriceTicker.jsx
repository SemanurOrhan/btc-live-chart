import { useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export default function PriceTicker({ price, priceChange }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (price === null) return;
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 300);
    return () => clearTimeout(timer);
  }, [price]);

  const colorClass =
    priceChange === "up"
      ? "text-emerald-400"
      : priceChange === "down"
        ? "text-rose-400"
        : "text-white";

  const bgFlash = flash
    ? priceChange === "up"
      ? "bg-emerald-500/10"
      : priceChange === "down"
        ? "bg-rose-500/10"
        : ""
    : "";

  return (
    <Card className={`p-6 transition-colors duration-300 ${bgFlash}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-400 font-medium">BTC / USDT</span>
        <Badge>Spot</Badge>
      </div>

      <div
        className={`text-4xl font-bold tracking-tight tabular-nums transition-colors duration-300 ${colorClass}`}
      >
        {price !== null
          ? `$${price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "—"}
      </div>

      <div className="flex items-center gap-2 mt-3 min-h-[24px]">
        {priceChange === "up" && (
          <span className="text-emerald-400 text-sm font-bold">▲</span>
        )}
        {priceChange === "down" && (
          <span className="text-rose-400 text-sm font-bold">▼</span>
        )}
        <span className="text-[11px] text-gray-500">Real-time · Binance</span>
      </div>
    </Card>
  );
}
