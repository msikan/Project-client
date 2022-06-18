import React from 'react';

import styles from './index.module.scss';

const MyCoins = ({ }) => {
  return (
    <div className={styles.container}>
        <div  className={styles.cardAmount}>
            <span  className={styles.title}>Total Balance</span>
            <span  className={styles.amount}>$123.342,62</span>
        </div>
    </div>
  );
};

export default React.memo(MyCoins);
