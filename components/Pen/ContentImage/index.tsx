import React from 'react';
import Image from 'next/image';
import { Asset } from 'contentful';
import styles from './ContentImage.module.scss';

interface ContentImageProps {
  imageAsset: Asset;
  testId?: string;
  priority?: boolean;
  className?: string;
}

const ContentImage = ({ className, imageAsset, testId, priority = false }: ContentImageProps) => {
  const { file, title, description } = imageAsset.fields;
  const { url, details } = file;
  const { width, height } = details?.image ?? {
    width: '100',
    height: '100',
  };

  const absoluteUrl = `https:${url}`;

  return (
    <div className={`${className} ${styles.imageWrapper}`} data-testid={testId}>
      <Image src={absoluteUrl} alt={description} width={width} height={height} priority={priority} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default ContentImage;
