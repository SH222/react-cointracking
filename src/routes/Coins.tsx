import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Body = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: #ffa229; */
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  text-shadow: 1.4px 3.7px 5.3px rgba(0, 0, 0, 0.053), 4.7px 12.5px 17.9px rgba(0, 0, 0, 0.077),
    21px 56px 80px rgba(0, 0, 0, 0.13);
`;

const CoinsList = styled.ul`
  a {
    color: inherit;
  }
  &:hover {
  }
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.listBoxColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 1.4px 3.7px 5.3px rgba(0, 0, 0, 0.053), 4.7px 12.5px 17.9px rgba(0, 0, 0, 0.077),
    21px 56px 80px rgba(0, 0, 0, 0.13);
  a {
    display: flex;
    padding: 10px;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    background-color: ${(props) => props.theme.hover};
    // react-router link는 결국 anchor로 바뀌기 때문에 a태그에 적용
    a {
      /* color: ${(props) => props.theme.accentColor}; */
    }
  }
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
  font-size: 30px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// API에서 가져올 데이터 interface 만들기
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const ModeBtn = styled.button`
  width: 30px;
  height: 30px;
  background-image: url("./imgs/light.png");
  background-size: cover;
  border: none;
  /* background-color: red; */
  /* background-color: transparent; */
  /* position: fixed;
  z-index: 1;
  right: 40px;
  top: 30px; */
`;

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  return (
    <Body>
      <Container>
        <HelmetProvider>
          <Helmet>
            <title>코인</title>
          </Helmet>
        </HelmetProvider>
        <Header>
          {/* <img src="/imgs/coins.jpg"></img> */}
          <Title>COINS</Title>
          {/* <ModeBtn onClick={toggleDark} /> */}
        </Header>
        {/* 삼항연산자 이용해서 loading 상태 처리 */}
        {isLoading === true ? (
          <Loader>"loading..."</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </Body>
  );
}

export default Coins;
