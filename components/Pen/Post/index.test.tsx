import React from 'react';
import { render, screen } from '@testing-library/react';
import { testPost } from 'tests/utils/contentfulTestData';
import Post from 'Pen/Post';

describe('<Post />', () => {
  describe('handles rendering', () => {
    beforeEach(() => {
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
      const hyperlink = screen.getByText('Test hyperlink') as HTMLAnchorElement;
      expect(hyperlink).toBeInTheDocument();
      expect(hyperlink.href).toEqual(`https://test.url/`);
    });

    test('youtube links as embeds', () => {
      const youtubeEmbed = screen.getByTestId('youtube-embed') as HTMLIFrameElement;
      expect(youtubeEmbed.src).toEqual('https://www.youtube-nocookie.com/embed/zqpUQxV4Lmg');
    });

    test('vimeo links as embeds', () => {
      const vimeoEmbed = screen.getByTestId('vimeo-embed') as HTMLIFrameElement;
      expect(vimeoEmbed.src).toEqual('https://player.vimeo.com/video/411598677?color=ffffff');
    });

    test('blockquotes', () => {
      const blockquoteText = screen.getByText('Test block quote');

      expect(blockquoteText).toBeInTheDocument();
      expect(blockquoteText.closest('blockquote')).toBeInTheDocument();
    });

    test('images', () => {
      const embeddedImage = screen.getByTestId('post-image');
      expect(embeddedImage).toBeInTheDocument();
    });
  });
});
