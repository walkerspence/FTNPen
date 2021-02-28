import { createClient } from 'contentful';
import Pen from 'Pen';

// todo: export client from module and import it here so we can mock it directly
const CLIENT = createClient({
  space: process.env.CONTENTFUL_ID,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

export async function getStaticPaths() {
  const { items: pens } = await CLIENT.getEntries();
  const pen_ids = pens.map((pen) => pen.sys.id);
  console.log(pen_ids);

  const paths = pen_ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { fields, sys } = await CLIENT.getEntry(params.id);
  const { createdAt, updatedAt } = sys;
  const { title, hero, post, byline } = fields;

  return {
    props: {
      createdAt,
      updatedAt,
      title,
      hero,
      post,
      byline,
    },
  };
}

export default Pen;
