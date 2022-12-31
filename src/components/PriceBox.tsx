import styled from "styled-components";
import { fetchCoinPriceInfo } from "../Api";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IPriceBox {
  percent: number;
  coinId: string;
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.boxColor};
  padding: 20px 10px;
  border-radius: 30px;
  span {
    font-size: 15px;
    display: block;
    margin-bottom: 10px;
  }
`;

function PriceBox({ percent, coinId }: IPriceBox) {
  const { isLoading: tickerLoading, data: tickerData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinPriceInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <Box>
      <span>
        {percent === 12
          ? `12시간 상승 : ${tickerData?.quotes.USD.percent_change_12h}`
          : percent === 24
          ? `24시간 상승 : ${tickerData?.quotes.USD.percent_change_24h}`
          : percent === 7
          ? `일주일 상승 : ${tickerData?.quotes.USD.percent_change_7d}`
          : percent === 30
          ? `한달 상승 : ${tickerData?.quotes.USD.percent_change_30d}`
          : null}
      </span>
      {percent === 12 ? (
        tickerData?.quotes.USD.percent_change_12h !== undefined &&
        tickerData?.quotes.USD.percent_change_12h < 0 ? (
          <FontAwesomeIcon icon={faArrowTrendDown} color="#44bd32" size="3x" />
        ) : (
          <FontAwesomeIcon icon={faArrowTrendUp} color="#e55039" size="3x" />
        )
      ) : percent === 24 ? (
        tickerData?.quotes.USD.percent_change_24h !== undefined &&
        tickerData?.quotes.USD.percent_change_24h < 0 ? (
          <FontAwesomeIcon icon={faArrowTrendDown} color="#44bd32" size="3x" />
        ) : (
          <FontAwesomeIcon icon={faArrowTrendUp} color="#e55039" size="3x" />
        )
      ) : percent === 7 ? (
        tickerData?.quotes.USD.percent_change_7d !== undefined &&
        tickerData?.quotes.USD.percent_change_7d < 0 ? (
          <FontAwesomeIcon icon={faArrowTrendDown} color="#44bd32" size="3x" />
        ) : (
          <FontAwesomeIcon icon={faArrowTrendUp} color="#e55039" size="3x" />
        )
      ) : percent === 30 ? (
        tickerData?.quotes.USD.percent_change_30d !== undefined &&
        tickerData?.quotes.USD.percent_change_30d < 0 ? (
          <FontAwesomeIcon icon={faArrowTrendDown} color="#44bd32" size="3x" />
        ) : (
          <FontAwesomeIcon icon={faArrowTrendUp} color="#e55039" size="3x" />
        )
      ) : null}
    </Box>
  );
}
export default PriceBox;
