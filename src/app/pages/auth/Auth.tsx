import React  from 'react';

import { useForm } from 'react-hook-form';
import { Button, Grid, makeStyles, TextField, } from '@material-ui/core';

import BusStopBG from '../../../assets/bus_stop_backgroud.svg';
import Pattern from '../../utils/pattern';

const useStyles = makeStyles({
  minHeight: { minHeight: '100vh' },
});


export default function Auth() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  function onSubmit(data: any) {
    console.log('1: ', data);
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <Grid container
            className={ classes.minHeight }
            item
            sm={ 12 }
            spacing={ 1 }
            direction="row-reverse"
            justify="center"
            alignItems="center"
      >
        <Grid
          className={ classes.minHeight }
          item
          container
          sm={ 2 }
          spacing={ 1 }
          direction="column"
          justify="center"
          alignItems="flex-start"
        />
        <Grid
          className={ classes.minHeight }
          item
          container
          sm={ 3 }
          spacing={ 1 }
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <img
            src={BusStopBG}
            style={{ width: 'inherit' }}
            alt='BusLogo'/>
        </Grid>
        <Grid container
              className={ classes.minHeight }
              item
              sm={ 7 }
              spacing={ 1 }
              direction="column"
              justify="center"
              alignItems="flex-end"
        >
          <Grid container sm={ 6 } item>
            <TextField
              name='email'
              fullWidth
              required
              id="id_auth_form_email"
              label="E-mail"
              variant="outlined"
              type='email'
              innerRef={ register({
                required: true,
                pattern: {
                  value: Pattern.EMAIL,
                  message: 'E-mail invalido',
                },
              }) }
            />
            { errors.email && errors }
          </Grid>
          <Grid container sm={ 6 } item>
            <TextField
              fullWidth
              id="id_auth_form_password"
              label="Senha"
              variant="outlined"
              type='password'
              required
            />
          </Grid>
          <Grid container sm={ 6 } justify='flex-end' item>
            <Button
              variant='text'
              color="primary"
            >
              Esqueceu a senha?
            </Button>
          </Grid>
          <Grid container sm={ 6 } item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type='submit'
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
