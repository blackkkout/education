import { graphql } from '../gql';

export const searchMostStarredRepos = graphql(/* GraphQL */ `
  query searchMostStarredRepos {
    search(
      query: "language:JavaScript stars:>10000"
      type: REPOSITORY
      first: 10
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
    }
  }
`);
