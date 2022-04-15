import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINT;

export const getPost = async () => {

    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredimage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
      
    `

    const results = await request(graphqlAPI, query);

    return results.postsConnection.edges;

};

export const getRecentPosts = async () => {
  const query = gql`
      query GetPostDetails() {
        posts(
          orderBy: createdAt_ASC
          last: 3
        ) {
          title 
          featuredimage{
            url
          }
          createdAt
          slug
        }
      }
  `

  const result = await request(graphqlAPI,query);
  return result.posts;
}

export const getSimilarPosts = async() => {

  const query = gql`
      query GetPostDetails($slug: String!, $categories:[String!]){
        posts(
          where:{slug_not:$slug,AND : {categories_some : {slug_in:$categories}}}
          last:3
        ) {
          title 
          featuredimage{
            url
          }
          createdAt
          slug
        }
      }
  `

  const result = await request(graphqlAPI,query);
  return result.posts;
}