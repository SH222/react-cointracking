import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  const { coinId } = useParams<{ coinId: string }>(); // ts에게 url에 어떤 파라미터가 있는지 알려줘야 함
  console.log(coinId);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinId" element={<Coin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
