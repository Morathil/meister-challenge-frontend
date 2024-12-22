import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper'

interface PassedProps {
  tasks?: Task[]
}

export default function GridLayout (props: PassedProps) {
  const tasks = props.tasks
  return (
    <Grid container spacing={2}>
      {tasks?.map((task, index) => {
        return (
          <Grid key={task.name + index} size={3}>
            <Paper style={{ textAlign: 'center', padding: '20px 0px', minHeight: '100px' }} elevation={2}>
              <Typography>
                {task.name}
              </Typography>
            </Paper>
          </Grid>
          )
      })}
    </Grid>
  )
}