import type { GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';

export const LinkCell = ({ value, row }: GridRenderCellParams) => (
  <Link href={`/repos/${encodeURIComponent(row.id)}`}>{value}</Link>
);
