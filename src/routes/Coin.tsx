import React, { useState } from "react";
import { Params, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
  font-size: 30px;
`;

interface RoutePrams extends Params {
  coinId: string;
}

interface RouterState {
  state: { name: string };
}

function Coin() {
  const [loading, setLoading] = useState(false);
  const { coinId } = useParams();

  const location = useLocation();
  const { state } = useLocation() as RouterState;
  console.log("location", location);
  console.log(state.name);
  return (
    <Container>
      <Header>
        {/* state가 존재하면 name을 가져오고 존재하지 않으면 "Loading" */}
        <Title>{state?.name || "Loading.."}</Title>
      </Header>
      {/* 삼항연산자 이용해서 loading 상태 처리 */}
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
