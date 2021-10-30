import React from 'react';
import Link from 'next/link';
import styles from './HomePage.module.scss';

const HomePage = () => (
  <div className={styles.home}>
    <div className={styles.centered}>
      <h1 className={styles.title}>FTN Pen</h1>
      <Link href="/archive">
        <a>archive</a>
      </Link>
    </div>
  </div>
);

export default HomePage;
