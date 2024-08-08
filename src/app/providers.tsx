'use client';

import { useMemo } from 'react';
import {
  ssrExchange,
  createClient,
  cacheExchange,
  fetchExchange,
  UrqlProvider,
} from '@urql/next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();

export function Providers({ children }: { children: React.ReactNode }) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    });

    const client = createClient({
      url: process.env.NEXT_PUBLIC_GITHUB_URL!,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      },
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </UrqlProvider>
  );
}
