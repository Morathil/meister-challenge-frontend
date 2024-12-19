import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import TaskGridLayout from 'views/App/GridLayout'
import TaskListLayout from 'views/App/ListLayout'

const tasks = ['t1', 't2', 't3', 't4', 't5']

// App
export default () => {
  const [useGridLayout, setUseGridLayout] = useState(true);
  const drawerWidth = 180

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant='h6'>Meister Challenge</Typography>
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
          {['Project1', 'Project2', 'Project3'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>            
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <TaskGridLayout tasks={tasks} />
        <TaskListLayout tasks={tasks} />
      </Box>
    </Box>
  )
}