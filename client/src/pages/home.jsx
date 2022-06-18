import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCoins from "../components/MyCoins";
import BuyAndSell from "../components/MyCoins/BuyAndSell";
import Transactions from "../components/MyCoins/Transactions";
import { getAuthEmail } from "../utils/auth";

const Home = () => {

  const { email, userName, levCoins } = useSelector(state => state?.app?.user);



 

  return (
    <div>
      <div className="App">
          <p> welcome <strong>{userName}</strong> </p>
      </div>
      <MyCoins />
      <Transactions />
      <BuyAndSell />
    </div>
  );
};

export default Home;
