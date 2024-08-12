'use client';

import { getRepoById } from '@/api/getRepoById';
import { useQuery } from '@urql/next';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

import { isRepo } from '@/lib/isRepo';
import Avatar from '@mui/material/Avatar';

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
      <Stack spacing={1}>
        <Typography variant="h4">{data.node.name}</Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <StarIcon /> {data.node.stargazerCount}
        </Stack>
        <Typography>{data.node.description}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src={data.node.owner.avatarUrl} />
          <Typography>{data.node.owner.login}</Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
