import { gql } from '@apollo/client';

export const FETCH_PROJECTS = {
    query: gql`
      query GetProjects {
        projects {
          id
          name
          tasks {
            id
            name
          }
        }
      }
    `,
  }