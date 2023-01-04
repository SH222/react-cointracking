import { useQuery } from "react-query";
import React from "react";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
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
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[{ name: "price", data: data?.map((price) => price.close) as number[] }]} // 데이터 부분
          options={{
            theme: { mode: "dark" },
            chart: { height: 500, width: 500, toolbar: { show: false }, background: "transparent" },
            stroke: { curve: "smooth", width: 3 },
            grid: { show: false },
            yaxis: { labels: { show: false } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
