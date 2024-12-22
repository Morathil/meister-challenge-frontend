import { FETCH_PROJECTS, FETCH_TASKS_BY_PROJECT_ID } from 'src/graphql/queries'
import apolloClient from 'services/apollo-client'

export function fetchProjects (): Promise<Project[]> {
  return apolloClient.query({ query: FETCH_PROJECTS })
    .then((result) => {
      return result.data.projects
    })
    // TODO: error handling
}

export function fetchTasksById (projectId: number): Promise<Task[]> {
  return apolloClient.query({ query: FETCH_TASKS_BY_PROJECT_ID, variables: { projectId }, fetchPolicy: 'network-only' })
    .then((result) => {
      return result.data.tasks
    })
    // TODO: error handling
}