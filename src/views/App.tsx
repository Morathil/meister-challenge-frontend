import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import TaskGridLayout from 'views/App/GridLayout'
import TaskListLayout from 'views/App/ListLayout'

import { FETCH_PROJECTS } from 'src/graphql/queries'

import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export default function App () {
  const [useListLayout, setUseListLayout] = useState(true);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    client.query(FETCH_PROJECTS)
      .then((result) => {
        setProjects(result.data.projects)
        setCurrentProject(result.data.projects[0])
      });
  }, [])

  if (!currentProject || !projects) {
    return <h1>Loading</h1>
  }

  const drawerWidth = 180

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>Meister Challenge</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Grid</Typography>
            <Switch defaultChecked color='default' onChange={(event) => {
              setUseListLayout(event.target.checked)
            }} />
            <Typography>List</Typography>
          </Stack>    
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        variant='permanent'
        anchor='left'>
        <Toolbar />
        <Divider />          
        <List>
          {projects.map((project) => (
            <ListItem key={project.name} disablePadding>
              <ListItemButton onClick={() => setCurrentProject(project)}>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>            
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {useListLayout ? <TaskListLayout tasks={currentProject.tasks} /> : <TaskGridLayout tasks={currentProject.tasks} />}
      </Box>
    </Box>
  )
}