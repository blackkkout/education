'use client';

import type { Column } from '@devexpress/dx-react-grid';
import Paper from '@mui/material/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { useQuery } from '@urql/next';

import type { Repository } from '@/gql/graphql';
import { searchMostStarredRepos } from '@/api/searchMostStarredRepos';
import { CircularProgress } from '@mui/material';

const columns: Column[] = [
  { name: 'name', title: 'Name' },
  { name: 'updatedAt', title: 'Updated at' },
  { name: 'stargazers.totalCount', title: 'Stars count' },
];

export function Demo() {
  const [{ data }] = useQuery({
    query: searchMostStarredRepos,
  });

  if (!data) return <CircularProgress />;

  const rows = data.search.edges
    ? data.search.edges.map((edge) => {
        if (!isRepository(edge?.node)) return null;

        return {
          name: edge.node.name,
          updatedAt: new Date(edge.node.updatedAt).toLocaleDateString(),
          'stargazers.totalCount': edge.node.stargazers.totalCount,
        };
      })
    : [];

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    </Paper>
  );
}

function isRepository(
  node: { __typename?: string } | undefined | null,
): node is Repository {
  return node ? node.__typename === 'Repository' : false;
}
