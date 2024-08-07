import { getClient } from '@/lib/gqlClient';
import { searchMostStarredRepos } from '@/searchMostStarredRepos';

export default async function Home() {
  const result = await getClient().query(searchMostStarredRepos, {});
  console.log(result.data?.search.edges);

  return <></>;
}
