import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

export default function RepoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Stack spacing={1}>{children}</Stack>
    </Container>
  );
}
