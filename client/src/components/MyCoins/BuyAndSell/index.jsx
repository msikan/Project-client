import React from "react";

import styles from "./index.module.scss";

const BuyAndSell = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.containreButton}>
        <button className={styles.buttonSell}>Sell</button>
        <button className={styles.buttonBuy}>Buy</button>
      </div>
    </div>
  );
};

export default React.memo(BuyAndSell);
