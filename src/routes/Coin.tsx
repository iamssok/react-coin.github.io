import { Switch, Route, Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  max-width:500px;
  margin:0 auto;
  padding:0px 20px;
`;
const Header = styled.header`
  display:flex;
  justify-content:center;
  align-items:center;
  height:10vh;
`;
const Title = styled.h1`
  font-weight:bold;
  font-size:48px;
  color: ${props => props.theme.accentColor};
`;
const Loader = styled.span`
  display:block;
  text-align:center;
`;
const Overview = styled.div`
  display:flex;
  justify-content:space-between;
  margin:10px 0;
  background:rgba(0, 0, 0, 0.5);
  border-radius:15px;
`;
const OverviewItem = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding:20px 30px;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #fff;
  }
  span:last-child {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
  }
`;
const Description = styled.p`
  margin:20px 5px;
  color: #fff;
  line-height:24px;
`;
const Tabs = styled.div`
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:10px;
  margin:25px 0;
`;
const Tab = styled.span<{ isActive: boolean }>`
  padding:7px 0;
  background:rgba(0, 0, 0, 0.5);
  border-radius:15px;
  font-weight:400;
  font-size:12px;
  text-align:center;
  text-transform:uppercase;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display:block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

function Coin() { 
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
      <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (<Loader>Loading...</Loader>) : (
        <>
        <Overview>
          <OverviewItem>
            <span>Rank</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Coin</span>
            <span>{infoData?.name}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol</span>
            <span>{infoData?.symbol}</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>Total Suply</span>
            <span>{tickersData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply</span>
            <span>{tickersData?.max_supply}</span>
          </OverviewItem>
        </Overview>
        <Description>{infoData?.description}</Description>
        <Tabs>
          <Tab isActive={priceMatch !== null}>
            <Link to={`/${coinId}/price`}>Price</Link>
          </Tab>
          <Tab isActive={chartMatch !== null}>            
            <Link to={`/${coinId}/chart`}>Chart</Link>
          </Tab>
        </Tabs>        
        <Switch>
          <Route path={`/:coinId/price`}>
            <Price />
          </Route>
          <Route path={`/:coinId/chart`}>
            <Chart coinId={coinId} />
          </Route>
        </Switch>
        </>
      )}            
    </Container>
  );
}

export default Coin;