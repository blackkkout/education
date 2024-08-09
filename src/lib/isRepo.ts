import { Repository } from '@/gql/graphql';

export function isRepo(
  node: { __typename?: string } | undefined | null,
): node is Repository {
  return node ? node.__typename === 'Repository' : false;
}
