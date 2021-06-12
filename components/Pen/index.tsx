import React from 'react';
import TimeStamp from 'Pen/TimeStamp';
import Post from 'Pen/Post';
import { IPenFields } from 'types/contentfulTypes';
import ContentImage from 'Pen/ContentImage';
import styles from './Pen.module.scss';

interface PenProps extends IPenFields {
  createdAt: string;
}

const Pen = ({ createdAt, title, hero, post, author }: PenProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <ContentImage testId="hero-image" imageAsset={hero} priority />
        <div className={styles.floatingBox}>
          <div className={styles.titleWrapper}>
            <div>
              <TimeStamp className={styles.timeStamp} utcString={createdAt} />
              <div className={styles.byline}>{`By ${author}`}</div>
            </div>
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
      </div>
      <Post post={post} />
    </div>
  );
};

export default Pen;
