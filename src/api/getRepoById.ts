import { graphql } from '../gql';

export const getRepoById = graphql(/* GraphQL */ `
  query getRepoById($id: ID!) {
    node(id: $id) {
      ... on Repository {
        id
        name
        description
        url
        owner {
          login
          avatarUrl
        }
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
        createdAt
        updatedAt
      }
    }
  }
`);
