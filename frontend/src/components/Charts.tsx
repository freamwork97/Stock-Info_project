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
export function CandleChartView({ candles, height = 460, movingAverages = [], maColors = {} }: CandleChartViewProps): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current || !candles?.length) return;
    if (chart.current) chart.current.destroy();
    const UP = '#f0454a';    // 상승 — 한국식 빨강
    const DOWN = '#2c6df2';  // 하락 — 한국식 파랑
    const FLAT = '#888888';  // 보합
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
    const fallbackColors: Record<number, string> = { 5: '#22c55e', 20: '#a855f7', 60: '#f59e0b', 120: '#3b82f6', 200: '#ec4899' };
    const colorMap = { ...fallbackColors, ...maColors };
    const maDatasets = movingAverages.map((p) => ({
      type: 'line' as const, label: `MA${p}`, data: sma(p),
      borderColor: colorMap[p] ?? '#06b6d4', borderWidth: 1.5,
      pointRadius: 0, fill: false, tension: 0,
    }));
    chart.current = new Chart(ref.current, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            label: '가격', data: candleData,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            borderColors: { up: UP, down: DOWN, unchanged: FLAT } as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            backgroundColors: { up: UP, down: DOWN, unchanged: FLAT } as any,
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

    // 최근 90일만 표시
    const recent = history.slice(-90);
    const histData = recent.map(h => ({ x: new Date(h.date).valueOf(), y: +h.close }));
    let predClose: { x: number; y: number }[] = [];
    if (prediction) {
      const lastX = histData[histData.length - 1];
      predClose = [lastX, ...prediction.dates.map((d, i) => ({ x: new Date(d).valueOf(), y: +prediction.close[i] }))];
    }

    chart.current = new Chart(ref.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: '실제 종가', data: histData,
            borderColor: text2, borderWidth: 2,
            pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: text2,
            fill: false, tension: 0.2,
          },
          ...(prediction ? [
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: '예측 종가 (30일)', data: predClose,
              borderColor: brand, borderWidth: 2, borderDash: [6, 4] as any,
              pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: brand,
              fill: false, tension: 0.2,
            },
          ] : []),
        ],
      },
      options: {
        animation: false,
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: text, font: { size: 11 } } },
          tooltip: {
            backgroundColor: 'var(--surface-2, #1e1e2e)',
            titleColor: text,
            bodyColor: text2,
            borderColor: grid,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              title: (items: any[]) => {
                if (!items.length) return '';
                const d = new Date(items[0].parsed.x);
                return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: (item: any) => {
                const val = item.parsed.y;
                if (val == null) return '';
                return ` ${item.dataset.label}: ${val.toLocaleString('ko-KR')}원`;
              },
            },
          },
        },
        scales: {
          x: {
            type: 'time', time: { unit: 'day' },
            grid: { color: grid },
            ticks: { color: text, font: { family: 'JetBrains Mono' }, maxTicksLimit: 8 },
          },
          y: {
            grid: { color: grid },
            ticks: {
              color: text, font: { family: 'JetBrains Mono' },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              callback: (v: any) => Number(v).toLocaleString('ko-KR'),
            },
          },
        },
      } as object,
    });
    return () => chart.current?.destroy();
  }, [history, prediction]);
  return <div style={{ height }}><canvas ref={ref} /></div>;
}
