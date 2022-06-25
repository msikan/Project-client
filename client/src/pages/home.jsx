import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCoins from "../components/MyCoins";
import BuyAndSell from "../components/MyCoins/BuyAndSell";
import Transactions from "../components/MyCoins/Transactions";
import { getAuthEmail } from "../utils/auth";

const Home = () => {

  const { email, userName, levCoins, coins } = useSelector(state => state?.app?.user);



 

  return (
    <div>
      <div className="App">
          <p> welcome <strong>{userName}</strong> </p>
      </div>
      <MyCoins coins={coins} />
      <Transactions />
      <BuyAndSell coins={coins} />
    </div>
  );
};

export default Home;
