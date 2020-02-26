import React from 'react';

import { Button, Grid } from '@material-ui/core';

export default function Auth() {
  return (
    <Grid container>
      <Grid xs={6}>
        <Button variant='contained'>Entrar</Button>
      </Grid>
      <Grid xs={6}>
        <Button variant='contained'>Nova Conta</Button>
      </Grid>
    </Grid>
  );
}
