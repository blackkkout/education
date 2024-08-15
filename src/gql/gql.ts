/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getLanguagesByOwner($owner: String!, $name: String!) {\n    repository(owner: $owner, name: $name) {\n      languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {\n        edges {\n          size\n          node {\n            name\n            color\n          }\n        }\n        totalSize\n      }\n    }\n  }\n": types.GetLanguagesByOwnerDocument,
    "\n  query getRepoById($id: ID!) {\n    node(id: $id) {\n      ... on Repository {\n        id\n        name\n        description\n        url\n        owner {\n          login\n          avatarUrl\n        }\n        stargazerCount\n        forkCount\n      }\n    }\n  }\n": types.GetRepoByIdDocument,
    "\n  query searchMostStarredRepos($query: String!, $first: Int!, $after: String) {\n    search(query: $query, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      edges {\n        node {\n          ... on Repository {\n            id\n            name\n            forkCount\n            stargazers {\n              totalCount\n            }\n            updatedAt\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.SearchMostStarredReposDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getLanguagesByOwner($owner: String!, $name: String!) {\n    repository(owner: $owner, name: $name) {\n      languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {\n        edges {\n          size\n          node {\n            name\n            color\n          }\n        }\n        totalSize\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLanguagesByOwner($owner: String!, $name: String!) {\n    repository(owner: $owner, name: $name) {\n      languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {\n        edges {\n          size\n          node {\n            name\n            color\n          }\n        }\n        totalSize\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRepoById($id: ID!) {\n    node(id: $id) {\n      ... on Repository {\n        id\n        name\n        description\n        url\n        owner {\n          login\n          avatarUrl\n        }\n        stargazerCount\n        forkCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRepoById($id: ID!) {\n    node(id: $id) {\n      ... on Repository {\n        id\n        name\n        description\n        url\n        owner {\n          login\n          avatarUrl\n        }\n        stargazerCount\n        forkCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchMostStarredRepos($query: String!, $first: Int!, $after: String) {\n    search(query: $query, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      edges {\n        node {\n          ... on Repository {\n            id\n            name\n            forkCount\n            stargazers {\n              totalCount\n            }\n            updatedAt\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchMostStarredRepos($query: String!, $first: Int!, $after: String) {\n    search(query: $query, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      edges {\n        node {\n          ... on Repository {\n            id\n            name\n            forkCount\n            stargazers {\n              totalCount\n            }\n            updatedAt\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;