import PriceChart from "./PriceChart";
import PriceTicker from "./PriceTicker";
import TradeHistory from "./TradeHistory";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { useBinanceTicker } from "../hooks/useBinanceTicker";

export default function Dashboard() {
  const { price, priceChange, chartData, trades, isConnected } =
    useBinanceTicker();

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="text-base font-bold text-white leading-none">
              ₿
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-none">
              BTC / USDT
            </h1>
            <span className="text-[10px] text-gray-500 font-medium">
              Live Dashboard
            </span>
          </div>
        </div>

        <Badge variant={isConnected ? "success" : "danger"}>
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isConnected
                ? "bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse"
                : "bg-rose-400"
            }`}
          />
          {isConnected ? "Live" : "Disconnected"}
        </Badge>
      </header>

      <main className="flex-1 min-h-0 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 h-full">
        <Card className="lg:col-span-3 p-4 flex flex-col min-h-0 h-full">
          <div className="flex items-center justify-between mb-2 shrink-0">
            <h2 className="text-sm font-semibold text-gray-300">Price Chart</h2>
            <Badge>60s window</Badge>
          </div>
          <div className="flex-1 min-h-0">
            <PriceChart chartData={chartData} priceChange={priceChange} />
          </div>
        </Card>

        <div className="lg:col-span-1 flex flex-col gap-4 lg:gap-6 min-h-0 h-full">
          <div className="shrink-0">
            <PriceTicker price={price} priceChange={priceChange} />
          </div>
          <Card className="flex-1 min-h-0 overflow-y-auto flex flex-col">
            <TradeHistory trades={trades} />
          </Card>
        </div>
      </main>
    </div>
  );
}
