'use client';

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, ChartProps } from 'react-chartjs-2';
import { useQuery } from '@urql/next';
import CircularProgress from '@mui/material/CircularProgress';

import { searchMostStarredRepos } from '@/api/searchMostStarredRepos';
import { isRepo } from '@/lib/isRepo';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Start by repositories',
    },
  },
};

export function ChartDemo() {
  const [{ data, error }] = useQuery({
    query: searchMostStarredRepos,
    variables: { first: 10, after: null },
  });

  if (!data) return <CircularProgress />;

  if (error) return null;

  const repos = data.search.edges
    ? data.search.edges.map((edge) => {
        if (isRepo(edge?.node)) return edge.node;
      })
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

  return chartData ? <Line options={options} data={chartData} /> : null;
}
