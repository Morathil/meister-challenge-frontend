import React from 'react'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'

interface PassedProps {
  setUseListLayout: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TopBar (props: PassedProps) {
  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>Meister Challenge</Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography>Grid</Typography>
          <Switch defaultChecked color='default' onChange={(event) => {
            props.setUseListLayout(event.target.checked)
          }} />
          <Typography>List</Typography>
        </Stack>    
      </Toolbar>
    </AppBar>
  )
}