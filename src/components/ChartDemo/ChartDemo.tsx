'use client';

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@urql/next';
import { alpha, useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import { searchMostStarredRepos } from '@/api/searchMostStarredRepos';
import { isRepo } from '@/lib/isRepo';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export function ChartDemo() {
  const theme = useTheme();
  const [{ data, error }] = useQuery({
    query: searchMostStarredRepos,
    variables: { first: 10, after: null },
  });

  if (!data)
    return (
      <div style={{ height: 576, width: '100%' }}>
        <Skeleton variant="rectangular" height="100%" />
      </div>
    );

  if (error) return <Alert severity="error">Error loading data.</Alert>;

  const repos = data.search.edges
    ? data.search.edges.map((edge) => (isRepo(edge?.node) ? edge.node : null))
    : [];

  const labels = repos.map((repo) => repo?.name);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Repository stargazers',
        data: repos.map((repo) => repo?.stargazers.totalCount),
        backgroundColor: alpha(theme.palette.primary.dark, 0.75),
      },
    ],
  };

  return chartData ? <Bar data={chartData} /> : null;
}
