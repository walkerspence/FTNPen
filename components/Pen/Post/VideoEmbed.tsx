import React from 'react';
import styles from './VideoEmbed.module.scss';

export enum VIDEO_HOSTS {
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
  DEFAULT = '',
}

interface VideoEmbedProps {
  url: string;
}

/* regex: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url */
const getIdFromYoutubeLink = (url: string) =>
  url.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^/]*?\/)*)\??v?=?([^#&?]*).*/)[3];

const getIdAndHost = (url: string) => {
  let id: string = '';
  let host: VIDEO_HOSTS = VIDEO_HOSTS.DEFAULT;

  if (url.includes('youtu')) {
    id = getIdFromYoutubeLink(url);
    host = VIDEO_HOSTS.YOUTUBE;
  }
  if (url.includes('vimeo')) {
    id = url.split('/')[3];
    host = VIDEO_HOSTS.VIMEO;
  }

  return { id, host };
};

const VideoEmbed = ({ url }: VideoEmbedProps) => {
  const { id, host } = getIdAndHost(url);
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
    <div className={styles.container}>
      <iframe
        className={styles.video}
        data-testid={`${host}-embed`}
        src={videoSource}
        title="Video Player"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>
  );
};

export default VideoEmbed;
