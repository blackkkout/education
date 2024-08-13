'use client';

import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from '@urql/next';
import { DataGrid } from '@mui/x-data-grid';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import { searchMostStarredRepos } from '@/api/searchMostStarredRepos';
import { isRepo } from '@/lib/isRepo';
import { LinkCell } from '../LinkCell';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, renderCell: LinkCell },
  {
    field: 'updatedAt',
    headerName: 'Updated at',
    flex: 1,
  },
  {
    field: 'stargazersCount',
    headerName: 'Stars count',
    flex: 1,
  },
];

export function GridDemo() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [after, setAfter] = useState<string | null>(null);

  const [{ data, error, fetching }] = useQuery({
    query: searchMostStarredRepos,
    variables: { first: paginationModel.pageSize, after },
  });

  if (!data)
    return (
      <div style={{ height: 631, width: '100%' }}>
        <Skeleton variant="rectangular" height="100%" />
      </div>
    );

  if (error) return <Alert severity="error">Error loading data.</Alert>;

  const rowsCount = Math.ceil(
    data.search.repositoryCount / paginationModel.pageSize,
  );

  const handlePaginationModelChange = (params: GridPaginationModel) => {
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
        if (isRepo(edge?.node))
          return {
            id: edge.node.id,
            name: edge.node.name,
            updatedAt: new Date(edge.node.updatedAt).toLocaleDateString(),
            stargazersCount: edge.node.stargazers.totalCount,
          };
      })
    : [];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowsCount}
        loading={fetching}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
        pageSizeOptions={[paginationModel.pageSize]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={handlePaginationModelChange}
      />
    </>
  );
}
