import React, { useState } from 'react'
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

const baseTasks = ['t1', 't2', 't3', 't4', 't5']
const projects = ['Project1', 'Project2', 'Project3']
const tasksByProject: { [key: string]: string[]} = projects.reduce((r: any, p) => {
  r[p] = baseTasks.map((t) => `${p}-${t}`)
  return r
}, {})

export default function App () {
  const [useListLayout, setUseListLayout] = useState(true);
  const [currentProject, setCurrentProject] = useState(projects[0]);

  const currentTasks = tasksByProject[currentProject]

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
          {projects.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setCurrentProject(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>            
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {useListLayout ? <TaskListLayout tasks={currentTasks} /> : <TaskGridLayout tasks={currentTasks} />}
      </Box>
    </Box>
  )
}