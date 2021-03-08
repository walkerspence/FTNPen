import TimeStamp from 'Pen/TimeStamp';
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
//TODO: proptypes

export default Pen;
