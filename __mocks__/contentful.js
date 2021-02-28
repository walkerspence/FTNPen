const entries = {
  items: [{ sys: { id: 1 } }, { sys: { id: 2 } }, { sys: { id: 3 } }],
};
const entry = {
  sys: { createdAt: '2021', updatedAt: '2021' },
  fields: {
    title: 'Test Title',
    hero: {},
    post: {},
    byline: 'By Test Byline',
  },
};
export const createClient = () => ({
  getEntries: jest.fn().mockResolvedValue(entries),
  getEntry: jest.fn().mockResolvedValue(entry),
});
