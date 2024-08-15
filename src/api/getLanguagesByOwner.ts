import { graphql } from '../gql';

export const getLanguagesByOwner = graphql(/* GraphQL */ `
  query getLanguagesByOwner($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
        edges {
          size
          node {
            name
            color
          }
        }
        totalSize
      }
    }
  }
`);
