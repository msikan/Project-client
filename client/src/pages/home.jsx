import { useEffect, useState } from "react";
import { getAuthEmail } from "../utils/auth";

const Home = () => {

  const [email,setEmail] = useState("");

  useEffect(() => {
    setEmail(getAuthEmail());
  },[]);


  return (
    <div>
      <div className="App">
        <header className="App-header">
          <p>Project Mahon Lev</p>
          email : {email}
        </header>
      </div>
    </div>
  );
};

export default Home;
