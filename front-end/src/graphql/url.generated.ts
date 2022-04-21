import * as Types from '../graphql.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUrlsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUrlsQuery = { __typename?: 'Query', urls: Array<{ __typename?: 'UrlDto', id?: number | null, url_orig: string, url_new: string }> };

export type AddUrlMutationVariables = Types.Exact<{
  url: Types.Scalars['String'];
}>;


export type AddUrlMutation = { __typename?: 'Mutation', url: { __typename?: 'UrlDto', id?: number | null } };


export const GetUrlsDocument = gql`
    query getUrls {
  urls {
    id
    url_orig
    url_new
  }
}
    `;
export function useGetUrlsQuery(baseOptions?: Apollo.QueryHookOptions<GetUrlsQuery, GetUrlsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUrlsQuery, GetUrlsQueryVariables>(GetUrlsDocument, options);
      }
export function useGetUrlsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUrlsQuery, GetUrlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUrlsQuery, GetUrlsQueryVariables>(GetUrlsDocument, options);
        }
export type GetUrlsQueryHookResult = ReturnType<typeof useGetUrlsQuery>;
export type GetUrlsLazyQueryHookResult = ReturnType<typeof useGetUrlsLazyQuery>;
export type GetUrlsQueryResult = Apollo.QueryResult<GetUrlsQuery, GetUrlsQueryVariables>;
export const AddUrlDocument = gql`
    mutation addUrl($url: String!) {
  url(url: $url) {
    id
  }
}
    `;
export function useAddUrlMutation(baseOptions?: Apollo.MutationHookOptions<AddUrlMutation, AddUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUrlMutation, AddUrlMutationVariables>(AddUrlDocument, options);
      }
export type AddUrlMutationHookResult = ReturnType<typeof useAddUrlMutation>;
export type AddUrlMutationResult = Apollo.MutationResult<AddUrlMutation>;
export type AddUrlMutationOptions = Apollo.BaseMutationOptions<AddUrlMutation, AddUrlMutationVariables>;