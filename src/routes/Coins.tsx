//import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCoins } from "../Api";
import Skeleton from "../components/skeleton-components/Skeleton";
import { Helmet } from "react-helmet";
import {
  Container,
  Header,
  Title,
  CoinList,
  CoinImg,
  Coin,
} from "../components/StyledComponents";
import WhiteDarkBtn from "../components/WhiteDarkBtn";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinData[]>("allCoins", fetchCoins);
  /* const [coins, setCoins] = useState<CoinData[]>([]);
  const [loding, setLoding] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoding(false);
    })();
  }, []);  */

  return (
    <Container>
      <Helmet>
        <title>COINS</title>
      </Helmet>
      <Header>
        <Title>COINS</Title>
        <WhiteDarkBtn />
      </Header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                    img: `https://cryptocurrencyliveprices.com/img/${coin.id}.png`,
                  },
                }}
              >
                <CoinImg
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt={coin.id}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
