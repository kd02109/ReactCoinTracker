import { useQuery } from "react-query";
import { fetchCoinChartInfo } from "../Api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import SkeletonChart from "../components/skeleton-components/SkeletonChart";
import NoneChart from "../components/NoneCharrt";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../components/atoms";

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 2rem;
  max-width: 30rem;
  margin: 0px auto;
`;

interface IChartProps {
  coinId: string;
}

interface IChartQuery {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
  error: string;
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IChartQuery[]>(
    ["chart", coinId],
    () => fetchCoinChartInfo(coinId),
    { refetchInterval: 10000 }
  );
  console.log(data, isLoading);
  return (
    <ChartContainer>
      {isLoading ? (
        <SkeletonChart />
      ) : Array.isArray(data) ? (
        <>
          <ApexChart
            series={[
              {
                name: "Price",
                data: data?.map((price) => parseFloat(price.close)) as number[],
              },
            ]}
            type="line"
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              xaxis: {
                categories: data?.map((price) =>
                  new Date(price.time_open * 1000).toISOString().slice(0, 10)
                ),
                type: "datetime",
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
              },
              chart: {
                toolbar: {
                  show: false,
                },
              },
              grid: { show: false },
              yaxis: { show: false },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
            width="480"
            height="200"
          />
          <ApexChart
            type={"candlestick"}
            series={
              [
                {
                  data: data?.map((price) => {
                    return {
                      x: new Date(price.time_open * 1000)
                        .toISOString()
                        .slice(0, 10),
                      y: [
                        parseFloat(price.open).toFixed(3),
                        parseFloat(price.high).toFixed(3),
                        parseFloat(price.low).toFixed(3),
                        parseFloat(price.close).toFixed(3),
                      ],
                    };
                  }),
                },
              ] as any
            }
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              xaxis: {
                categories: data?.map((price) =>
                  new Date(price.time_open * 1000).toISOString().slice(0, 10)
                ),
                type: "datetime",
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
              },
              chart: {
                toolbar: {
                  show: false,
                },
              },
              grid: { show: false },
              yaxis: { show: false },
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
            width="480"
            height="200"
          />
        </>
      ) : (
        <NoneChart />
      )}
    </ChartContainer>
  );
}

export default Chart;
