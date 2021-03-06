import { Document } from '@contentful/rich-text-types';
import { Asset } from 'contentful';

export const testHero = {
  fields: {
    title: 'Test image title',
    description: 'Test image description',
    file: {
      url: '//test-hero-image.url',
      details: { size: 0, image: { height: 150, width: 250 } },
      fileName: '',
      contentType: '',
    },
  },
  sys: {
    id: 'test-hero-sys-id',
    type: 'Asset',
  },
  toPlainObject: () => {},
} as Asset;

export const testHyperlink = {
  nodeType: 'hyperlink',
  content: [
    {
      nodeType: 'text',
      value: 'Test hyperlink',
      marks: [],
      data: {},
    },
  ],
  data: {
    uri: 'https://test.url',
  },
};

export const testYoutubeHyperlink = {
  nodeType: 'hyperlink',
  content: [
    {
      nodeType: 'text',
      value: 'https://www.youtube.com/watch?v=zqpUQxV4Lmg&t=336s',
      marks: [],
      data: {},
    },
  ],
  data: {
    uri: 'https://www.youtube.com/watch?v=zqpUQxV4Lmg&t=336s',
  },
};

export const testVimeoHyperlink = {
  nodeType: 'hyperlink',
  content: [
    {
      nodeType: 'text',
      value: 'https://vimeo.com/411598677',
      marks: [],
      data: {},
    },
  ],
  data: {
    uri: 'https://vimeo.com/411598677',
  },
};

export const testEmbeddedAssetBlock = {
  nodeType: 'embedded-asset-block',
  content: [],
  data: {
    target: {
      fields: {
        title: 'Test embedded image title',
        description: 'Test embedded image description',
        file: {
          url: '//test-embedded-image.url',
          details: {
            image: {
              width: 50,
              height: 75,
            },
          },
        },
      },
    } as Asset,
  },
};

export const testPost = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Test text node',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'Test bold text node',
          marks: [
            {
              type: 'bold',
            },
          ],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'Test italic text node',
          marks: [
            {
              type: 'italic',
            },
          ],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'Test underline text node',
          marks: [
            {
              type: 'underline',
            },
          ],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'Test code text node',
          marks: [
            {
              type: 'code',
            },
          ],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: 'paragraph',
      content: [testHyperlink],
      data: {},
    },
    {
      nodeType: 'unordered-list',
      content: [
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Test bullet 1',
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
          ],
          data: {},
        },
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Test bullet 2 ',
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
          ],
          data: {},
        },
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Test bullet 3',
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
          ],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: 'ordered-list',
      content: [
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Test number 1',
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
          ],
          data: {},
        },
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Test number 2',
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
          ],
          data: {},
        },
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Test number 3',
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
          ],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: 'blockquote',
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Test block quote',
              marks: [],
              data: {},
            },
          ],
          data: {},
        },
      ],
      data: {},
    },
    testEmbeddedAssetBlock,
    {
      nodeType: 'paragraph',
      content: [testYoutubeHyperlink],
      data: {},
    },
    {
      nodeType: 'paragraph',
      content: [testVimeoHyperlink],
      data: {},
    },
  ],
} as Document;
