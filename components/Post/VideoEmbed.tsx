import React from 'react';

export enum VIDEO_HOSTS {
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
  DEFAULT = '',
}

interface VideoEmbedProps {
  id: string;
  host: VIDEO_HOSTS;
}

const VideoEmbed = ({ id, host }: VideoEmbedProps) => {
  let videoSource: string;

  switch (host) {
    case VIDEO_HOSTS.YOUTUBE:
      videoSource = `https://www.youtube-nocookie.com/embed/${id}`;
      break;
    case VIDEO_HOSTS.VIMEO:
      videoSource = `https://player.vimeo.com/video/${id}?color=ffffff`;
      break;
    default:
      videoSource = '';
      break;
  }

  return (
    <iframe
      data-testid={`${host}-embed`}
      src={videoSource}
      title="Vimeo video player"
      width="640"
      height="360"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
};

export default VideoEmbed;
