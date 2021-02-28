import * as contentful from 'contentful';
import { render, screen } from '@testing-library/react';
import Pen, { getStaticPaths, getStaticProps } from 'p/[id]';

jest.mock('contentful');

describe('/pen/[id]', () => {
  describe('Server', () => {
    test('getStaticPaths gets correct paths from contentful', async () => {
      const paths = await getStaticPaths();
      const expectedPaths = {
        paths: [
          { params: { id: 1 } },
          { params: { id: 2 } },
          { params: { id: 3 } },
        ],
        fallback: false,
      };
      expect(paths).toEqual(expectedPaths);
    });
    test('passes gets correct props from contentful', async () => {
      const props = await getStaticProps({ params: { id: 1 } });
      const expectedProps = {
        props: {
          createdAt: '2021',
          updatedAt: '2021',
          title: 'Test Title',
          hero: {},
          post: {},
          byline: 'By Test Byline',
        },
      };
      expect(props).toEqual(expectedProps);
    });
  });

  test('does something', () => {
    render(<Pen />);
    expect(screen.getByTestId('penContainer')).toBeInTheDocument();
  });
});
