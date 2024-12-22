import { gql } from '@apollo/client';

export const FETCH_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
    }
  }
`

export const FETCH_TASKS_BY_PROJECT_ID = gql`
  query GetTasksByProjectId($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      name
    }
  }
`