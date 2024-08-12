import type { Meta, StoryObj } from '@storybook/react';
import { createClient, fetchExchange, ssrExchange } from '@urql/core';
import { UrqlProvider } from '@urql/next';
import { useMemo } from 'react';
import { graphql, HttpResponse } from 'msw';

import { ChartDemo } from './ChartDemo';

const mockData = {
  search: {
    edges: [
      {
        node: {
          id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
          name: 'react',
          stargazers: {
            totalCount: 20,
          },
          __typename: 'Repository',
        },
      },
      {
        node: {
          id: 'MDEwOlJlcG9zaXRvcnkxDJI3MDI1MA==',
          forkCount: 34118,
          name: 'angular',
          stargazers: {
            totalCount: 15,
          },
          __typename: 'Repository',
        },
      },
      {
        node: {
          id: 'MDEwOlJlcG9zaXRvcnkxDJI3MDI1MA==',
          forkCount: 34118,
          name: 'vue',
          stargazers: {
            totalCount: 10,
          },
          __typename: 'Repository',
        },
      },
    ],
    __typename: 'SearchResultItemConnection',
  },
};

const meta: Meta<typeof ChartDemo> = {
  component: ChartDemo,
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

type Story = StoryObj<typeof ChartDemo>;

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
