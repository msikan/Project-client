import styles from "./index.module.scss";

import dayjs from 'dayjs';

const Transactions = ({ transations }) => {

  console.log({ transations },transations?.length );
 
  return (
    <div className={styles.container}>
      Transactions
      <div className={styles.container}>
        {transations?.map(({ coins, date }, idx) => (
          <div className={styles.transation} key={idx}>
            <span className={styles.date}>{date && dayjs(date).format('DD/MM/YYYY HH:mm')}</span>
            <span className={styles.coins}>${coins}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
