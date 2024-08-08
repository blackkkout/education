'use client';

import type { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@urql/next';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';

import type { Repository } from '@/gql/graphql';
import { searchMostStarredRepos } from '@/api/searchMostStarredRepos';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
  { field: 'stargazers.totalCount', headerName: 'Stars count', flex: 1 },
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
          id: edge.node.name,
          name: edge.node.name,
          updatedAt: new Date(edge.node.updatedAt).toLocaleDateString(),
          'stargazers.totalCount': edge.node.stargazers.totalCount,
        };
      })
    : [];

  return <DataGrid rows={rows} columns={columns} />;
}

function isRepository(
  node: { __typename?: string } | undefined | null,
): node is Repository {
  return node ? node.__typename === 'Repository' : false;
}
