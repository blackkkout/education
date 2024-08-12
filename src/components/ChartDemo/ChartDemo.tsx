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
import CircularProgress from '@mui/material/CircularProgress';

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
  const [{ data, error }] = useQuery({
    query: searchMostStarredRepos,
    variables: { first: 10, after: null },
  });

  if (!data) return <CircularProgress />;

  if (error) return null;

  const repos = data.search.edges
    ? data.search.edges.map((edge) => (isRepo(edge?.node) ? edge.node : null))
    : [];

  const labels = repos.map((repo) => repo?.name);

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Repository stargazers',
        data: repos.map((repo) => repo?.stargazers.totalCount),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return chartData ? <Bar data={chartData} /> : null;
}
