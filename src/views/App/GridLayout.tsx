import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper'

// GridLayout
export default (props) => {
  const tasks = props.tasks
  return (
    <Grid container spacing={2}>
      {tasks.map((task) => {
      return (
        <Grid key={task} size={3}>
          <Paper style={{ textAlign: 'center', padding: '20px 0px' }} elevation={2}>
            <Typography>
            {task}
            </Typography>
          </Paper>
        </Grid>
        )
      })}
    </Grid>
  )
}