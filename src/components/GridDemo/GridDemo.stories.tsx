import type { Meta, StoryObj } from '@storybook/react';
import { createClient, fetchExchange, ssrExchange } from '@urql/core';
import { UrqlProvider } from '@urql/next';
import { useMemo } from 'react';
import { graphql, HttpResponse } from 'msw';

import { GridDemo } from './GridDemo';

const mockData = {
  search: {
    edges: [
      {
        node: {
          id: '1',
          name: 'react',
          stargazers: {
            totalCount: 20,
          },
          updatedAt: '2024-08-01T09:39:57Z',
          __typename: 'Repository',
        },
      },
      {
        node: {
          id: '2',
          name: 'angular',
          stargazers: {
            totalCount: 15,
          },
          updatedAt: '2024-08-02T09:39:57Z',
          __typename: 'Repository',
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
    repositoryCount: 1,
    __typename: 'SearchResultItemConnection',
  },
};

const meta: Meta<typeof GridDemo> = {
  component: GridDemo,
  decorators: [
    (Story) => {
      const [client, ssr] = useMemo(() => {
        const ssr = ssrExchange();

        const client = createClient({
          url: 'https://example.com',
          exchanges: [ssr, fetchExchange],
        });

        return [client, ssr];
      }, []);

      return (
        <UrqlProvider client={client} ssr={ssr}>
          <Story />
        </UrqlProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof GridDemo>;

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('searchMostStarredRepos', () => {
          return HttpResponse.json({
            data: {
              ...mockData,
            },
          });
        }),
      ],
    },
  },
};
