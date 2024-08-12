'use client';

import { useQuery } from '@urql/next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

import { getRepoById } from '@/api/getRepoById';
import { isRepo } from '@/lib/isRepo';
import { Modal } from './modal';
import { Avatar } from '@mui/material';

export default function RepoModal({
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
    <Modal>
      <DialogTitle color="primary.main">{data.node.name}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <StarIcon /> {data.node.stargazerCount}
          </Stack>
          <Typography>{data.node.description}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={data.node.owner.avatarUrl} />
            <Typography>{data.node.owner.login}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Modal>
  );
}
