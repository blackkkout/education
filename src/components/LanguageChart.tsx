import { useQuery } from '@urql/next';
import { Pie } from 'react-chartjs-2';
import Skeleton from '@mui/material/Skeleton';

import { getLanguagesByOwner } from '@/api/getLanguagesByOwner';
import {
  ArcElement,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface LanguageChartProps {
  owner: string;
  name: string;
}

export function LanguageChart({ owner, name }: LanguageChartProps) {
  const [{ fetching, error, data }] = useQuery({
    query: getLanguagesByOwner,
    variables: { owner, name },
  });

  if (error) return <p>Error</p>;

  if (!data)
    return <Skeleton variant="rectangular" height="320px" width="320px" />;

  const languages = data?.repository?.languages?.edges;

  const chartData = {
    labels: languages?.map((lang) => lang?.node.name),
    datasets: [
      {
        data: languages?.map((lang) => lang?.size),
        backgroundColor: languages?.map((lang) => lang?.node.color),
      },
    ],
  } as ChartData<'pie'>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Repository Language Breakdown',
      },
    },
  } as ChartOptions<'pie'>;

  return (
    <div style={{ width: '320px', height: '320xp' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}
