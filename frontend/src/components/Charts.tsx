import React, { useEffect, useRef } from 'react';
import {
  Chart, LineController, LineElement, PointElement,
  LinearScale, CategoryScale, TimeScale, Tooltip, Filler, BarController, BarElement,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { getCSSVar } from '../utils/format';
import type {
  SparklineProps, LineChartViewProps, CandleChartViewProps, PredictChartViewProps,
} from '../types/components';

Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale,
  Tooltip, Filler, BarController, BarElement,
  CandlestickController, CandlestickElement
);

// ===== Sparkline =====
export function Sparkline({ data, height = 36, color, fill = true }: SparklineProps): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current || !data?.length) return;
    if (chart.current) chart.current.destroy();
    const isUp = data[data.length - 1] >= data[0];
    const c = color || (isUp ? getCSSVar('--up') : getCSSVar('--down'));
    chart.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data, borderColor: c, borderWidth: 1.5,
          backgroundColor: fill ? c + '22' : 'transparent',
          fill, pointRadius: 0, tension: 0.25,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { tooltip: { enabled: false }, legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
        animation: false,
      },
    });
    return () => chart.current?.destroy();
  }, [data, color, fill]);
  return <canvas ref={ref} style={{ height, width: '100%', display: 'block' }} />;
}

// ===== LineChart =====
export function LineChartView({ labels, data, height = 280, color }: LineChartViewProps): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current || !data?.length) return;
    if (chart.current) chart.current.destroy();
    const isUp = data[data.length - 1] >= data[0];
    const c = color || (isUp ? getCSSVar('--up') : getCSSVar('--down'));
    const grid = getCSSVar('--border');
    const text = getCSSVar('--text-3');
    chart.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: labels || data.map((_, i) => String(i)),
        datasets: [{
          data, borderColor: c, borderWidth: 2,
          backgroundColor: c + '22', fill: true, pointRadius: 0, tension: 0.2,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: text, maxTicksLimit: 6, font: { family: 'JetBrains Mono' } } },
          y: { grid: { color: grid }, ticks: { color: text, font: { family: 'JetBrains Mono' } } },
        },
      },
    });
    return () => chart.current?.destroy();
  }, [labels, data, color]);
  return <div style={{ height }}><canvas ref={ref} /></div>;
}

// ===== Candlestick =====
export function CandleChartView({ candles, height = 460, movingAverages = [] }: CandleChartViewProps): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current || !candles?.length) return;
    if (chart.current) chart.current.destroy();
    const upColor = getCSSVar('--up');
    const downColor = getCSSVar('--down');
    const grid = getCSSVar('--border');
    const text = getCSSVar('--text-3');
    const candleData = candles.map(c => ({
      x: new Date(c.date).valueOf(),
      o: +c.open, h: +c.high, l: +c.low, c: +c.close,
    }));
    const sma = (period: number) => {
      const out: { x: number; y: number | null }[] = [];
      const close = candles.map(c => +c.close);
      let sum = 0;
      for (let i = 0; i < close.length; i++) {
        sum += close[i];
        if (i >= period) sum -= close[i - period];
        if (i >= period - 1) out.push({ x: candleData[i].x, y: sum / period });
        else out.push({ x: candleData[i].x, y: null });
      }
      return out;
    };
    const colors = ['#22c55e', '#a855f7', '#f59e0b', '#3b82f6', '#ec4899', '#06b6d4'];
    const maDatasets = movingAverages.map((p, i) => ({
      type: 'line' as const, label: `MA${p}`, data: sma(p),
      borderColor: colors[i % colors.length], borderWidth: 1.5,
      pointRadius: 0, fill: false, tension: 0,
    }));
    chart.current = new Chart(ref.current, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            label: '가격', data: candleData,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            borderColor: { up: upColor, down: downColor, unchanged: text } as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            backgroundColor: { up: upColor, down: downColor, unchanged: text } as any,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(maDatasets as any[]),
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: movingAverages.length > 0, labels: { color: text, font: { size: 11 } } } },
        scales: {
          x: { type: 'time', time: { unit: candles.length > 90 ? 'month' : 'week' },
               grid: { color: grid }, ticks: { color: text, font: { family: 'JetBrains Mono' } } },
          y: { grid: { color: grid }, ticks: { color: text, font: { family: 'JetBrains Mono' } } },
        },
      } as object,
    });
    return () => chart.current?.destroy();
  }, [candles, movingAverages]);
  return <div style={{ height }}><canvas ref={ref} /></div>;
}

// ===== Predict (history line + future dashed) =====
export function PredictChartView({ history, prediction, height = 360 }: PredictChartViewProps): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current || !history?.length) return;
    if (chart.current) chart.current.destroy();
    const text2 = getCSSVar('--text-2');
    const brand = getCSSVar('--brand');
    const grid = getCSSVar('--border');
    const text = getCSSVar('--text-3');

    const histData = history.map(h => ({ x: new Date(h.date).valueOf(), y: +h.close }));
    let predClose: { x: number; y: number }[] = [];
    let predHigh: { x: number; y: number }[] = [];
    let predLow: { x: number; y: number }[] = [];
    if (prediction) {
      const lastX = histData[histData.length - 1];
      predClose = [lastX, ...prediction.dates.map((d, i) => ({ x: new Date(d).valueOf(), y: +prediction.close[i] }))];
      predHigh = prediction.dates.map((d, i) => ({ x: new Date(d).valueOf(), y: +prediction.high[i] }));
      predLow = prediction.dates.map((d, i) => ({ x: new Date(d).valueOf(), y: +prediction.low[i] }));
    }

    chart.current = new Chart(ref.current, {
      type: 'line',
      data: {
        datasets: [
          { label: '실제 종가', data: histData, borderColor: text2, borderWidth: 2, pointRadius: 0, fill: false, tension: 0.2 },
          ...(prediction ? [
            { label: '예측 상한', data: predHigh, borderColor: 'transparent', backgroundColor: brand + '22', fill: '+1', pointRadius: 0 },
            { label: '예측 하한', data: predLow, borderColor: 'transparent', backgroundColor: 'transparent', fill: false, pointRadius: 0 },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { label: '예측 종가', data: predClose, borderColor: brand, borderWidth: 2, borderDash: [6, 4] as any, pointRadius: 0, fill: false, tension: 0.2 },
          ] : []),
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: text, font: { size: 11 }, filter: (l: { text: string }) => !['예측 상한', '예측 하한'].includes(l.text) } } },
        scales: {
          x: { type: 'time', time: { unit: 'month' }, grid: { color: grid }, ticks: { color: text, font: { family: 'JetBrains Mono' } } },
          y: { grid: { color: grid }, ticks: { color: text, font: { family: 'JetBrains Mono' } } },
        },
      } as object,
    });
    return () => chart.current?.destroy();
  }, [history, prediction]);
  return <div style={{ height }}><canvas ref={ref} /></div>;
}
