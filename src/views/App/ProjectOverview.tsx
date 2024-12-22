import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'

interface PassedProps {
  projects: Project[]
  setCurrentProjectId: React.Dispatch<React.SetStateAction<number | undefined>>
  currentProjectId: number
}

export default function ProjectOverview (props: PassedProps) {
  const drawerWidth = 180

  return (
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
        {props.projects.map((project) => (
          <ListItem key={project.name} disablePadding>
            <ListItemButton onClick={() => props.setCurrentProjectId(project.id)} selected={project.id === props.currentProjectId}>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>            
    </Drawer>
  )
}