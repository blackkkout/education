'use client';

import { getRepoById } from '@/api/getRepoById';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@urql/next';
import StarIcon from '@mui/icons-material/Star';

import { isRepo } from '@/lib/isRepo';

export default function RepoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [{ data, error }] = useQuery({
    query: getRepoById,
    variables: { id: decodeURIComponent(id) },
  });

  if (error) return null;

  if (!data || !isRepo(data.node)) return null;

  return (
    <Container>
      <Typography variant="h4">{data.node.name}</Typography>
      <Typography>{data.node.description}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <StarIcon /> {data.node.stargazerCount}
      </Stack>
    </Container>
  );
}
