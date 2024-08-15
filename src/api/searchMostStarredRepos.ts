import { graphql } from '../gql';

export const searchMostStarredRepos = graphql(/* GraphQL */ `
  query searchMostStarredRepos($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            forkCount
            stargazers {
              totalCount
            }
            updatedAt
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
