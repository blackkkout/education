import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Demo } from '@/components/Demo';

export default function Home() {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h4">Most starred repositories</Typography>
        <Demo />
      </Stack>
    </Container>
  );
}
