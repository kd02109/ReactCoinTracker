//import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import {
  CoinImg,
  Container,
  Header,
  Title,
} from "../components/StyledComponents";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPriceInfo } from "../Api";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import SkeletonCoin from "../components/skeleton-components/SkeletonCoin";
import WhiteDarkBtn from "../components/WhiteDarkBtn";

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.accentColor};
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 600;
  background-color: ${(props) => props.theme.boxColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  max-width: 500px;
`;

interface Params {
  coinId: string;
}

interface locationObject {
  state: object;
  name: string;
  img: string;
  pathName: string;
}
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

function Coin() {
  const { coinId } = useParams<Params>(); //params를 받아올 수 있는 hook
  const location = useLocation<locationObject>(); // 이전 페이지의 정보를 받아올수 있는 hook
  const priceMatch = useRouteMatch("/:coinId/price"); // useRouteMach는 유저가 특정한 URL에 있는지의 여부를 알려준다.
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinPriceInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );
  /*
  const [loding, setLoding] = useState(true);
  const [price, setPrice] = useState<IPriceData>();
  const [info, setInfo] = useState<IInfoData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
      setLoding(false);
    })();
  }, [coinId]);
  console.log(info);
  console.log(price);
  */
  const loading = infoLoading || tickerLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {location.state !== undefined
            ? location.state.name
            : loading
            ? loading
            : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={`/`}>
          {}
          <StyledFontAwesomeIcon icon={faAngleLeft} size="3x" />
        </Link>
        <Title>
          {location.state !== undefined
            ? `${location.state.name.slice(0, 10)}...`
            : loading
            ? loading
            : infoData?.name}
        </Title>
        {location.state !== undefined ? (
          <CoinImg src={location.state.img} alt={location.state.name} />
        ) : null}
        <WhiteDarkBtn />
      </Header>
      {loading ? (
        <>
          <SkeletonCoin />
        </>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickerData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description.slice(0, 500)}...</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
/*      */
