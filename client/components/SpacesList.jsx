import React, { useState, useEffect } from 'react';
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// required styling for material-ui for table
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SpacesList = () => {
  
  const classes = useStyles();
  const [spaces, setSpaces] = useState([])

  const handleClick = (e) => {
    e.preventDefault();
    fetch('/spaces/fetch')
      .then(response => response.json())
      .then(data => {
        setSpaces(data);
      })
  }

  function createData(id, namespace, team_id, project) {
    return { id, namespace, team_id, project };
  }

  const rows = spaces.map((space) => {
    return createData(space._id, space.name, space.team_id, space.project);
  })

  return (
    <div id='SpacesList'>
      <h3>Current Namespaces</h3>
      <Button id="get-spaces" onClick={handleClick} variant="outlined">Get Spaces</Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Namespace</TableCell>
              <TableCell align="right">Team ID</TableCell>
              <TableCell align="right">Project</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.namespace}</TableCell>
                <TableCell align="right">{row.team_id}</TableCell>
                <TableCell align="right">{row.project}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default SpacesList;

