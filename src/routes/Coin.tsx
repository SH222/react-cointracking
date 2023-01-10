import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";
import {
  Link,
  Params,
  PathMatch,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const HomeBtn = styled(Link)`
  background-image: url("./imgs/house.png");
  background-size: cover;
  display: flex;
  float: left;
  display: inline-block;
  width: 30px;
  height: 30px;
  justify-content: center;
  position: absolute;
  top: 80px;
  right: 40px;
`;

const Header = styled.header`
  height: 10vh;
  line-height: 10vh;
  display: inline-block;
  margin: 20px 0px;
  width: 100%;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 50px;
  justify-content: center;
  display: flex;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
  font-size: 30px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin: 20px 0px;
  box-shadow: 1.4px 3.7px 5.3px rgba(0, 0, 0, 0.053), 4.7px 12.5px 17.9px rgba(0, 0, 0, 0.077),
    21px 56px 80px rgba(0, 0, 0, 0.13);
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

// const Description = styled.p`
//   margin: 20px 0px;
// `;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  background-color: ${(props) => props.theme.boxColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.accentColor};
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
  }
`;

interface RoutePrams extends Params {
  coinId: string;
}

interface RouterState {
  state: { name: string };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
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

interface PriceData {
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

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams<RoutePrams>();
  const { state } = useLocation() as RouterState;
  const chartMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/chart");
  const priceMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/price");

  // 모든 query는 각각의 고유한 id를 갖고 있어야 함
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () =>
    fetchCoinInfo(`${coinId}`)
  ); // 매개변수가 필요한 경우 화살표함수 사용
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(`${coinId}`),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading; // loading의 종류가 여러개인 경우

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{state?.name ? state.name : infoLoading ? "Loading.." : infoData?.name}</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        {/* mainpage를 거치지 않고 바로 코인페이지로 들어오는 경우 infoData.name 출력 */}
        <HomeBtn to="/" />
        <Title>{state?.name ? state.name : infoLoading ? "Loading.." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Overview>{infoData?.description}</Overview>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
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
          <Routes>
            <Route path="price" element={<Price coinId={coinId!} tickersData={tickersData} />} />
            <Route path="chart" element={<Chart coinId={coinId!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
