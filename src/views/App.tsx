import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import TaskGridLayout from 'views/App/GridLayout'
import TaskListLayout from 'views/App/ListLayout'
import TopBar from 'views/App/TopBar'
import ProjectOverview from 'views/App/ProjectOverview'
import { useSubscription } from '@apollo/client'
import * as apiServices from 'services/api'
import { SUBSCRIBE_TO_TASKS_CREATED } from 'src/graphql/subscriptions'

export default function App () {
  const [useListLayout, setUseListLayout] = useState(true);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const [tasksByProjectId, setTasksByProjectId] = useState<{ [key: string]: Task[] } | undefined>(undefined);
  const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(undefined);

  useSubscription<{ taskCreated: Task }>(SUBSCRIBE_TO_TASKS_CREATED, {
    onData: ({ data }) => {
      if (data?.data) {
        const task = data.data.taskCreated
        const taskProjectId = task.project.id
        const tasks = (tasksByProjectId && tasksByProjectId[taskProjectId]) ? [...tasksByProjectId[taskProjectId]] : []
        tasks.push(task)
        setTasksByProjectId(Object.assign({}, tasksByProjectId, { [taskProjectId]: tasks }))
      }
    }
  });
  
  useEffect(() => {
    apiServices.fetchProjects()
      .then((responseProjects) => {
        setProjects(responseProjects)

        if (responseProjects.length > 0) {
          setCurrentProjectId(responseProjects[0].id)
        }
      })
  }, [])

  useEffect(() => {
    if (currentProjectId) {
      apiServices.fetchTasksById(currentProjectId)
        .then((responseTasks) => {
          setTasksByProjectId(Object.assign({}, tasksByProjectId, { [currentProjectId]: responseTasks }))
        })
    }
  }, [currentProjectId])

  if (!projects || !currentProjectId) {
    return <h1>Loading ...</h1>
  }

  const selectedProjectTasks = tasksByProjectId ? tasksByProjectId[currentProjectId] : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar setUseListLayout={setUseListLayout} />
      <ProjectOverview projects={projects} currentProjectId={currentProjectId} setCurrentProjectId={setCurrentProjectId} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {(useListLayout ? <TaskListLayout tasks={selectedProjectTasks} /> : <TaskGridLayout tasks={selectedProjectTasks} />)}
      </Box>
    </Box>
  )
}