'use client';

import { useQuery } from '@urql/next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

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
      <DialogTitle>{data.node.name}</DialogTitle>
      <DialogContent>{data.node.description}</DialogContent>
    </Modal>
  );
}
