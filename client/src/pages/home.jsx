import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCoins from "../components/MyCoins";
import BuyAndSell from "../components/MyCoins/BuyAndSell";
import Transactions from "../components/MyCoins/Transactions";
import { getLevCoins } from "../api/levCoins";
import dayjs from "dayjs";

const Home = () => {

  const { email, userName, levCoins } = useSelector(state => state?.app?.user);


  const [transations,setTransactions] = useState([]);
  const [coins,setCoins] = useState(0);


  useEffect(() => {
    getApiTransactions();
  },[]);

  const getApiTransactions = async() => {
    const { data } = await getLevCoins();
    console.log({ data });
    if (data) {
      const listTansations = Object.keys(data).map(transaction => ({
        ...(data[transaction] || {}),
        date: transaction
      }));
      const matchesByDate = listTansations.sort((a,b) =>  new Date(b.date) - new Date(a.date));
      const matchByUpperPrice = matchesByDate.map((transaction,index) => ({
        ...transaction,
        isUpper:( transaction?.coins > matchesByDate[index + 1]?.coins),
        lastCoins: matchesByDate[index + 1]?.coins
      }))
      const total = matchByUpperPrice.reduce((acc,el)=> acc + Number(el.coins),0);
      setCoins(total);
      setTransactions(matchByUpperPrice);

    }
  }



 

  return (
    <div>
      <div className="App">
          <p> welcome <strong>{userName}</strong> </p>
      </div>
      <MyCoins coins={coins} />
      <Transactions transations={transations} />
      <BuyAndSell coins={coins} getApiTransactions={getApiTransactions} />
    </div>
  );
};

export default Home;
