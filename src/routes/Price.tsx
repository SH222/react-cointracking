import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

const Container = styled.div`
  /* max-width: 480px; */
  /* margin: 0 auto; */
`;

const Overview = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
  height: 100%;
  /* justify-content: space-between; */
  background-color: white;
  border-radius: 10px;
  /* margin: 20px 0px; */
  box-shadow: 1.4px 3.7px 5.3px rgba(0, 0, 0, 0.053), 4.7px 12.5px 17.9px rgba(0, 0, 0, 0.077),
    21px 56px 80px rgba(0, 0, 0, 0.13);
  margin-bottom: 20px;
`;

const OverviewItem = styled.div`
  width: 100%;
  /* display: flex; */
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  color: gray;
  font-size: 16px;
  line-height: 40px;
  font-weight: 700;
  text-align: left;
`;

const Data = styled.span`
  color: ${(props) => props.theme.priceTextColor};
  float: right;
  text-align: right;
  font-weight: 700;
  font-size: 36px;
`;

const Positive = styled(Data)`
  color: red;
`;

const Negative = styled(Data)`
  color: blue;
`;

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

interface PriceProps {
  coinId: string;
  tickersData?: PriceData;
}

function Price({ coinId, tickersData }: PriceProps) {
  const [data, setData] = useState<PriceData>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setData(tickersData);
    setLoading(false);
  }, [coinId, tickersData]);
  return (
    <Container>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <Text>현재가</Text>
              <Data>{`$${data?.quotes.USD.price.toFixed(2)}`}</Data>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Text>15분 전보다</Text>
              <Data>{`${data?.quotes.USD.percent_change_15m.toFixed(2)}%`}</Data>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Text>30분 전보다</Text>
              <Data>{`${data?.quotes.USD.percent_change_30m.toFixed(2)}%`}</Data>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Text>1시간 전보다</Text>
              <Data>{`${data?.quotes.USD.percent_change_1h.toFixed(2)}%`}</Data>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Text>6시간 전보다</Text>
              <Data>{`${data?.quotes.USD.percent_change_6h.toFixed(2)}%`}</Data>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Text>12시간 전보다</Text>
              <Data>{`${data?.quotes.USD.percent_change_12h.toFixed(2)}%`}</Data>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Text>24시간 전보다</Text>
              <Data>{`${data?.quotes.USD.percent_change_24h.toFixed(2)}%`}</Data>
            </OverviewItem>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Price;
