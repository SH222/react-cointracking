import { useQuery } from "react-query";
import React from "react";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {
        isLoading ? (
          "Loading chart..."
        ) : (
          <ApexCharts
            type="candlestick"
            series={
              [
                {
                  data: data?.map((price) => {
                    return {
                      x: price.time_close,
                      y: [price.open, price.high, price.low, price.close],
                    };
                  }),
                },
              ] as any
            }
            options={{
              chart: {
                height: 500,
                width: 500,
                toolbar: { show: false },
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
              theme: { mode: "dark" },
              xaxis: {
                type: "datetime",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#478cd6",
                    downward: "#e96f28",
                  },
                },
              },
            }}
          />
        )
        // <ApexCharts
        // series={[{ name: "price", data: data?.map((price) => price.close) as number[] }]} // 데이터 부분
        //   // options={{
        //   //   theme: { mode: "dark" },
        //   //   chart: { height: 500, width: 500, toolbar: { show: false }, background: "transparent" },
        //   //   stroke: { curve: "smooth", width: 3 },
        //   //   grid: { show: false },
        //   //   yaxis: { labels: { show: false } },
        //   //   xaxis: {
        //   //     axisBorder: { show: false },
        //   //     axisTicks: { show: false },
        //   //     labels: { show: false },
        //   //     type: "datetime",
        //   //     categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()), // 날짜 형식으로 변환
        //   //   },
        //   //   fill: { type: "gradient", gradient: { gradientToColors: ["blue"], stops: [0, 100] } },
        //   //   colors: ["purple"],
        //   //   tooltip: {
        //   //     y: { formatter: (value) => `$${value.toFixed(2)}` }, // 소수점 2자리까지만 출력
        //   //   },
        //   // }}
        // />
      }
    </div>
  );
}

export default Chart;
