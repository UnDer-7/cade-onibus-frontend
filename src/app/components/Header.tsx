import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';
import EnvVariables from '../utils/EnvironmentVariables';

export default function Header(): ReactElement {
  return (
    <Grid container
          item
          sm={ 6 }
          justify='center'
    >
      <Typography variant='h2'
                  align='center'
                  color='primary'
                  style={ { marginBottom: 20 } }
      >
        { EnvVariables.APP_NAME }
      </Typography>
    </Grid>
  );
}
