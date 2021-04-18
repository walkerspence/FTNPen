import React, { ReactNode } from 'react';
import { Asset } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Node, Inline, Text, Block, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { IPenFields } from 'types/contentfulTypes';
import Image from 'next/image';
import VideoEmbed, { VIDEO_HOSTS } from './VideoEmbed';

interface PostProps {
  post: IPenFields['post'];
}

const renderEmbeddedImage = (embeddedAsset: Asset) => {
  const { file, title, description } = embeddedAsset.fields;
  const { url, details } = file;
  const { width, height } = details?.image ?? {
    width: '100',
    height: '100',
  };

  const absoluteUrl = `https:${url}`;

  return (
    <div>
      <Image src={absoluteUrl} alt={description} width={width} height={height} />
      <div>{title}</div>
    </div>
  );
};

// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export const getIdFromYoutubeLink = (url: string) =>
  url.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^/]*?\/)*)\??v?=?([^#&?]*).*/)[3];

const renderLink = (url: string, child: Text, children: ReactNode) => {
  if (child.value === url) {
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
    return <VideoEmbed id={id} host={host} />;
  }

  return <a href={url}>{children}</a>;
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => renderEmbeddedImage(node.data.target),
    [INLINES.HYPERLINK]: (node: Inline | Block, children: ReactNode) => {
      const child = node.content[0] as Text;
      return renderLink(node.data.uri, child, children);
    },
  },
};

const Post = ({ post }: PostProps) => {
  return <div data-testid="postContainer">{post ? documentToReactComponents(post, options) : ''}</div>;
};

/*
TODO
Style blockquotes as pull quotes
*/
export default Post;
