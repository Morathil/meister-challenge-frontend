import { gql } from '@apollo/client';

export const SUBSCRIBE_TO_TASKS_CREATED = gql`
  subscription OnTaskCreated {
    taskCreated {
        id
        name
        project {
          id
        }
    }
  }
`
