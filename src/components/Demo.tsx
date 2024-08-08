'use client';

import type { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from '@urql/next';
import { DataGrid } from '@mui/x-data-grid';

import type { Repository } from '@/gql/graphql';
import { searchMostStarredRepos } from '@/api/searchMostStarredRepos';
import { CircularProgress } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
  { field: 'stargazersCount', headerName: 'Stars count', flex: 1 },
];

export function Demo() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [after, setAfter] = useState<string | null>(null);

  const [{ data, fetching }] = useQuery({
    query: searchMostStarredRepos,
    variables: { first: paginationModel.pageSize, after },
  });

  if (!data) return <CircularProgress />;

  const rowsCount = Math.ceil(
    data.search.repositoryCount / paginationModel.pageSize,
  );

  const handlePaginationModelChange = (params: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel({
      page: params.page,
      pageSize: params.pageSize,
    });

    setAfter(
      params.page > 0 && data.search.pageInfo.endCursor
        ? data.search.pageInfo.endCursor
        : null,
    );
  };

  const rows = data.search.edges
    ? data.search.edges.map((edge) => {
        if (!isRepository(edge?.node)) return null;

        return {
          id: `${edge.node.name}-${edge.node.stargazers.totalCount}`,
          name: edge.node.name,
          updatedAt: new Date(edge.node.updatedAt).toLocaleDateString(),
          stargazersCount: edge.node.stargazers.totalCount,
        };
      })
    : [];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={rowsCount}
      loading={fetching}
      pageSizeOptions={[10]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={handlePaginationModelChange}
    />
  );
}

function isRepository(
  node: { __typename?: string } | undefined | null,
): node is Repository {
  return node ? node.__typename === 'Repository' : false;
}
