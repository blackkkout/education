import { graphql } from '../gql';

export const searchMostStarredRepos = graphql(/* GraphQL */ `
  query searchMostStarredRepos($first: Int!, $after: String) {
    search(
      query: "language:JavaScript stars:>10000"
      type: REPOSITORY
      first: $first
      after: $after
    ) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            descriptionHTML
            stargazers {
              totalCount
            }
            forks {
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
