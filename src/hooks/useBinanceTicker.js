import { useState, useEffect, useRef, useCallback } from "react";

const WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const FLUSH_INTERVAL = 1000;
const MAX_CHART_POINTS = 60;
const MAX_TRADES = 20;
const RECONNECT_DELAYS = [1000, 2000, 4000, 8000, 16000, 30000];

export function useBinanceTicker() {
  const [state, setState] = useState({
    price: null,
    priceChange: "neutral",
    chartData: [],
    trades: [],
    isConnected: false,
  });

  const bufferRef = useRef([]);
  const wsRef = useRef(null);
  const flushIntervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptRef = useRef(0);
  const lastPriceRef = useRef(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      reconnectAttemptRef.current = 0;
      setState((prev) => ({ ...prev, isConnected: true }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      bufferRef.current.push({
        price: parseFloat(data.p),
        qty: parseFloat(data.q),
        time: data.T,
        isBuyerMaker: data.m,
      });
    };

    ws.onclose = () => {
      setState((prev) => ({ ...prev, isConnected: false }));
      const attempt = Math.min(
        reconnectAttemptRef.current,
        RECONNECT_DELAYS.length - 1,
      );
      reconnectTimeoutRef.current = setTimeout(
        connect,
        RECONNECT_DELAYS[attempt],
      );
      reconnectAttemptRef.current++;
    };

    ws.onerror = () => ws.close();
  }, []);

  useEffect(() => {
    connect();

    flushIntervalRef.current = setInterval(() => {
      const buffer = bufferRef.current;
      if (buffer.length === 0) return;

      const messages = buffer.splice(0);
      const latest = messages[messages.length - 1];

      const direction =
        lastPriceRef.current === null
          ? "neutral"
          : latest.price > lastPriceRef.current
            ? "up"
            : latest.price < lastPriceRef.current
              ? "down"
              : "neutral";

      lastPriceRef.current = latest.price;

      setState((prev) => {
        const chartData = [
          ...prev.chartData,
          { x: latest.time, y: latest.price },
        ].slice(-MAX_CHART_POINTS);

        const newTrades = messages
          .map((m) => ({
            price: m.price,
            qty: m.qty,
            time: m.time,
            isBuyerMaker: m.isBuyerMaker,
          }))
          .reverse();

        return {
          price: latest.price,
          priceChange: direction,
          chartData,
          trades: [...newTrades, ...prev.trades].slice(0, MAX_TRADES),
          isConnected: prev.isConnected,
        };
      });
    }, FLUSH_INTERVAL);

    return () => {
      wsRef.current?.close();
      clearInterval(flushIntervalRef.current);
      clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);

  return state;
}
