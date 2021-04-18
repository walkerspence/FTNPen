import React from 'react';

interface ImageMockProps {
  src: string;
  alt: string;
  height: string;
  width: string;
  priority: boolean;
}

const Image = ({ src, alt, width, height, priority }: ImageMockProps) => {
  return <img data-priority={priority} src={src} alt={alt} width={width} height={height} />;
};

export default Image;
