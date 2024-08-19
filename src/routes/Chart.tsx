import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number,
  time_close: number,
  open: string,
  high: string,
  low: string,
  close: number,
  volume: string,
  market_cap: number,
}

interface chartProps {
  coinId: string;
}

function Chart({coinId}: chartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return <div>{isLoading ? "Loading Chart..." : <ApexChart 
    type="line"
    series={[
      {
        name: "Price",
        data: data?.map(price => price.close) as number[],
      },
    ]}
    options={{
      theme: {
        mode: isDark ? "dark" : "light",
      },
      chart: {
        width:500,
        height:250,
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      grid: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        type: "datetime",
        categories: data?.map((price) => price.time_close),
      },
      tooltip: {
        y: {
          formatter: (value) => `$ ${value.toFixed(2)}`
        }
      }
    }} />}</div>
}

export default Chart;