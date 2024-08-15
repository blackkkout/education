'use client';

import { useQuery } from '@urql/next';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getRepoById } from '@/api/getRepoById';
import { isRepo } from '@/lib/isRepo';
import { LanguageChart } from '@/components/LanguageChart';

export default function RepoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [{ data, error }] = useQuery({
    query: getRepoById,
    variables: { id: decodeURIComponent(id) },
  });

  if (error) return <Alert severity="error">Error loading data.</Alert>;

  if (!data || !isRepo(data.node)) {
    return <RepoSkeleton />;
  }

  return (
    <>
      <Box>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" color="primary.main">
        {data.node.name}
      </Typography>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            color="primary"
            icon={<StarIcon />}
            label={data.node.stargazerCount}
          />
          <Chip
            color="primary"
            avatar={
              <Avatar
                alt={`Repository icon for ${data.node.name}`}
                src={data.node.owner.avatarUrl}
              />
            }
            label={data.node.owner.login}
            variant="outlined"
          />
        </Stack>
        <Typography color="grey.700">{data.node.description}</Typography>
      </Stack>
      <LanguageChart owner={data.node.owner.login} name={data.node.name} />
    </>
  );
}

function RepoSkeleton() {
  return (
    <Box>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton
            width={100}
            variant="rounded"
            sx={{ fontSize: '1.25rem' }}
          />
          <Skeleton
            width={100}
            variant="rounded"
            sx={{ fontSize: '1.25rem' }}
          />
        </Stack>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </Stack>
    </Box>
  );
}
