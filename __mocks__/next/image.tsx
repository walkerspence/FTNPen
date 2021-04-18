import React from 'react';

interface ImageMockProps {
  src: string;
  alt: string;
  height: string;
  width: string;
}

const Image = ({ src, alt, width, height }: ImageMockProps) => {
  return <img src={src} alt={alt} width={width} height={height} />;
};

export default Image;
