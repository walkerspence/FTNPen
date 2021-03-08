import TimeStamp from 'Pen/TimeStamp';
import PropTypes from 'prop-types';
import Image from 'next/image';

const Pen = ({ createdAt, title, hero, imageDescription, post, author }) => {
  const { url } = hero.fields.file;
  const absoluteUrl = `https:${url}`;

  return (
    <div>
      <h1>{title}</h1>
      <div>{`By ${author}`}</div>
      <TimeStamp utcString={createdAt} />
      <Image
        width={1000}
        height={1000}
        alt={imageDescription}
        src={absoluteUrl}
        priority={true}
      />
    </div>
  );
};

Pen.propTypes = {
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hero: PropTypes.shape({
    fields: PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  }),
  imageDescription: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  author: PropTypes.string.isRequired,
};

export default Pen;
