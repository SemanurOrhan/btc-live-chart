export default function TradeHistory({ trades }) {
  return (
    <div className="p-4 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">
        Recent Trades
      </h3>

      <div className="flex text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2 px-1">
        <span className="flex-1">Price (USDT)</span>
        <span className="w-24 text-right">Qty (BTC)</span>
        <span className="w-20 text-right">Time</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-px scrollbar-thin">
        {trades.length === 0 && (
          <div className="text-gray-600 text-sm text-center py-8">
            Waiting for trades…
          </div>
        )}

        {trades.map((trade, i) => (
          <div
            key={`${trade.time}-${i}`}
            className="flex items-center text-xs px-1 py-1.5 rounded hover:bg-gray-800/50 transition-colors"
          >
            <span
              className={`flex-1 font-mono font-medium ${
                trade.isBuyerMaker ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {trade.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>

            <span className="w-24 text-right text-gray-400 font-mono">
              {trade.qty.toFixed(6)}
            </span>

            <span className="w-20 text-right text-gray-500 font-mono">
              {new Date(trade.time).toLocaleTimeString("en-US", {
                hour12: false,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
