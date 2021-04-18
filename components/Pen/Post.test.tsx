import React from 'react';
import { render, screen } from '@testing-library/react';
import { testEmbeddedAssetBlock, testHyperlinkNode, testPost } from 'tests/utils/contentfulTestData';
import Post from './Post';

describe('<Post />', () => {
  describe('handles rendering', () => {
    beforeEach(() => {
      // @ts-expect-error
      render(<Post post={testPost} />);
    });

    describe('text', () => {
      test('normal text', () => {
        const text = screen.getByText(/Test text node/);
        expect(text).toBeInTheDocument();
      });

      test('bold text', () => {
        const boldText = screen.getByText(/Test bold text node/);
        expect(boldText).toBeInTheDocument();
        expect(boldText).toHaveStyle('font-weight: bold');
      });

      test('italic text', () => {
        const italicText = screen.getByText(/Test italic text node/);
        expect(italicText).toBeInTheDocument();
        expect(italicText).toHaveStyle('font-style: italic');
      });

      test('underlined text', () => {
        const underlineText = screen.getByText(/Test underline text node/);
        expect(underlineText).toBeInTheDocument();
        expect(underlineText).toHaveStyle('text-decoration: underline');
      });

      test('code text', () => {
        const codeText = screen.getByText(/Test code text node/);
        expect(codeText).toBeInTheDocument();
        expect(codeText).toHaveStyle('font-family: monospace');
      });
    });

    describe('lists', () => {
      test('unordered', () => {
        const unorderedListItems = screen.getAllByText(/Test bullet/);
        expect(unorderedListItems).toHaveLength(3);

        unorderedListItems.forEach((listItem) => {
          const parent = listItem.closest('ul');
          expect(parent).toHaveStyle('list-style-type: disc');
        });
      });

      test('ordered', () => {
        const orderedListItems = screen.getAllByText(/Test number/);
        expect(orderedListItems).toHaveLength(3);

        orderedListItems.forEach((listItem) => {
          const parent = listItem.closest('ol');
          expect(parent).toHaveStyle('list-style-type: decimal');
        });
      });
    });

    test('normal links', () => {
      const hyperlinkTestURL = testHyperlinkNode.data.uri;
      const hyperlink = screen.getByText('Test hyperlink') as HTMLAnchorElement;
      expect(hyperlink).toBeInTheDocument();
      expect(hyperlink.href).toEqual(`${hyperlinkTestURL}/`);
    });

    test.todo('youtube links as embeds');

    test.todo('vimeo links as embeds');

    test('blockquotes', () => {
      const blockquoteText = screen.getByText('Test block quote');

      expect(blockquoteText).toBeInTheDocument();
      expect(blockquoteText.closest('blockquote')).toBeInTheDocument();
    });

    describe('images', () => {
      test('with correct props', () => {
        const embeddedImagetestUrl = testEmbeddedAssetBlock.data.target.fields.file.url;
        const image = screen.getByAltText('Test embedded image description') as HTMLImageElement;

        expect(image).toBeInTheDocument();
        expect(image.src).toEqual(`https:${embeddedImagetestUrl}/`);
        expect(image.width).toEqual(50);
        expect(image.height).toEqual(75);
      });

      test('with image title', () => {
        const imageTitle = screen.getByText('Test embedded image title');
        expect(imageTitle).toBeInTheDocument();
      });
    });
  });
});
