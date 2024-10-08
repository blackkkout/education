'use client';

import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useQuery } from '@urql/next';
import { DataGrid } from '@mui/x-data-grid';
import { debounce } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { searchMostStarredRepos } from '@/api/searchMostStarredRepos';
import { isRepo } from '@/lib/isRepo';
import { LinkCell } from '../LinkCell';
import { LanguagePicker } from '../LanguagePicker';
import { SortPicker } from '../SortPicker';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, renderCell: LinkCell },
  {
    field: 'updatedAt',
    headerName: 'Updated at',
    flex: 1,
  },
  {
    field: 'stargazersCount',
    headerName: 'Stars',
    flex: 1,
  },
  {
    field: 'forksCount',
    headerName: 'Forks',
    flex: 1,
  },
];

const sortOptions = {
  BEST_MATCH: '',
  STARS_DESC: 'stars-desc',
  STARS_ASC: 'stars-asc',
  FORKS_DESC: 'forks-desc',
  FORKS_ASC: 'forks-asc',
  UPDATED_DESC: 'updated-desc',
  UPDATED_ASC: 'updated-asc',
} as const;

const sortLabels = {
  [sortOptions.BEST_MATCH]: 'Best match',
  [sortOptions.STARS_DESC]: 'Most stars',
  [sortOptions.STARS_ASC]: 'Fewest stars',
  [sortOptions.FORKS_DESC]: 'Most forks',
  [sortOptions.FORKS_ASC]: 'Fewest forks',
  [sortOptions.UPDATED_DESC]: 'Recently updated',
  [sortOptions.UPDATED_ASC]: 'Last recently updated',
} as const;

type SortOption = (typeof sortOptions)[keyof typeof sortOptions];

export function GridDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<SortOption>(sortOptions.BEST_MATCH);
  const [languages, setLanguages] = useState<string[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [after, setAfter] = useState<string | null>(null);

  const languageFilter =
    languages.length > 0
      ? `${languages.map((language) => `language:${language}`).join(' ')}`
      : '';

  const [{ data, error, fetching }] = useQuery({
    query: searchMostStarredRepos,
    variables: {
      query: `${languageFilter} sort:${sort} stars:>0 ${searchQuery}`,
      first: paginationModel.pageSize,
      after,
    },
  });

  if (!data)
    return (
      <div style={{ height: 687, width: '100%' }}>
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
            updatedAt: formatUpdatedAt(edge.node.updatedAt),
            stargazersCount: formatCount(edge.node.stargazers.totalCount),
            forksCount: formatCount(edge.node.forkCount),
          };
      })
    : [];

  const setQueryDebounced = debounce(setSearchQuery, 500);

  const handleLanguagesChange = (
    _: React.SyntheticEvent,
    newValue: string[],
  ) => {
    setLanguages(newValue);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as SortOption);
  };

  return (
    <Stack spacing={2}>
      <Grid container wrap="nowrap" gap={2}>
        <Grid item md={4} xs={6}>
          <TextField
            size="small"
            label="Search..."
            onChange={(e) => setQueryDebounced(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <SortPicker
            value={sort}
            onChange={handleSortChange}
            sortLabels={sortLabels}
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <LanguagePicker onChange={handleLanguagesChange} />
        </Grid>
      </Grid>
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
    </Stack>
  );
}

function formatUpdatedAt(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatCount(count: number) {
  return count.toLocaleString('en-US').replace(/,/g, ' ');
}
