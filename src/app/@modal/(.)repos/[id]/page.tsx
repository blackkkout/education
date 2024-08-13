'use client';

import { useQuery } from '@urql/next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { getRepoById } from '@/api/getRepoById';
import { isRepo } from '@/lib/isRepo';
import { Modal } from './modal';

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
      </DialogContent>
    </Modal>
  );
}
