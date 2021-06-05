import { testPost, testHero } from 'tests/utils/contentfulTestData';

export const getEntries = jest.fn().mockResolvedValue({
  items: [{ sys: { id: 1 } }, { sys: { id: 2 } }, { sys: { id: 3 } }],
});

export const getEntry = jest.fn().mockResolvedValue({
  sys: { createdAt: new Date('2000 PST').toUTCString() },
  fields: {
    title: 'Test Title',
    hero: testHero,
    post: testPost,
    author: 'Test Author',
  },
});

export const createClient = () => ({
  getEntries,
  getEntry,
});
