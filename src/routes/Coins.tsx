import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 20px;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;
const Title = styled.h1`
  margin-top: 5px;
  font-weight: bold;
  font-size: 40px;
  color: ${props => props.theme.accentColor};
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  max-width: 400px;
  margin: 10px auto;
  border-radius: 15px;
  background: ${props => props.theme.boxColor};
  font-weight: bold;
  color: ${props => props.theme.textColor};
  a {
    display: flex;
    align-items: center;
    padding: 24px;
    transition: color .15s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;
const Loader = styled.span`
  display: block;
  text-align: center;
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
        <button onClick={toggleDarkAtom}>Theme mode</button>
      </Header>
      {isLoading ? (<Loader>Loading...</Loader>) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}>
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