import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding:0px 20px;
`;

const Header = styled.header`
  display:flex;
  justify-content:center;
  align-items:center;
  height:10vh;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  max-width:500px;
  margin: 10px auto;
  background:white;
  border-radius:15px;
  font-weight:bold;
  color: ${props => props.theme.textColor};
  a {
    display:flex;
    align-items:center;
    padding:20px;
    transition:color .2s ease-in;
  }
  &:hover {
    a {
      color:${props => props.theme.accentColor};
    }
  }
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

const Img = styled.img`
  width:35px;
  margin-right:10px;
`;

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDarkAtom}>thmem Mode</button>
      </Header>
      {isLoading ? (<Loader>Loading...</Loader>) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="" />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;