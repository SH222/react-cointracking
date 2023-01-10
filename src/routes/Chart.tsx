import { useQuery } from "react-query";
import React from "react";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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

const isDark = useRecoilValue(isDarkAtom);

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
      {isLoading ? (
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
            // theme: { mode: isMode ? "dark" : "light" },
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
      )}
    </div>
  );
}

export default Chart;
