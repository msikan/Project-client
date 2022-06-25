import React from "react";

import styles from "./index.module.scss";
import ModalSell from "./ModalSell";

const BuyAndSell = ({ coins }) => {

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={styles.container}>
      <div className={styles.containreButton}>
        {/* <button className={styles.buttonSell}>Sell</button> */}
        <button className={styles.buttonBuy} onClick={handleClickOpen} >Buy</button>
      </div>
      <ModalSell open={open} handleClose={handleClose} defaultCoins={coins} />
    </div>
  );
};

export default React.memo(BuyAndSell);
