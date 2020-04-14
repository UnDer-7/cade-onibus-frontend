import React from 'react';

import { Button, Grid, makeStyles, TextField, Typography, } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SignInWithEmail } from '../../types/SignInWithEmail';
import GoogleIcon from '../../components/CustonIcons';
import Divider from '../../components/Divider';
import InputInvalid from '../../components/InputInvalid';
import EnvVariables from '../../../core/utils/EnvironmentVariables';
import Validations from '../../../core/utils/Validations';
import AuthService from '../../../core/services/AuthService';

const useStyles = makeStyles({
  minHeight: { minHeight: '100vh' },
});

export default function SignIn({ history }: RouteComponentProps) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<SignInWithEmail>();

  function onSignInWithEmail(data: SignInWithEmail) {
    AuthService.signInWithEmail(data)
      .then(() => {
        console.log('HISTORY: ', history);
        history.push('/home');
      });
  }

  function onSignInWithGoogle() {
  }

  function onShowMaps() {
    console.log('---- SHOW MAPS ----');
  }

  function forgotPassword() {
    console.log('---- FORGOT PASSWORD ----');
  }

  function newAccount() {
    console.log('---- NEW ACCOUNT ----');
  }

  return (
    <form onSubmit={ handleSubmit(onSignInWithEmail) } noValidate>
      <Grid container
            className={ classes.minHeight }
            item
            xs={ 12 }
            spacing={ 1 }
            justify="center"
            alignItems="center"
      >
        <Grid container
              className={ classes.minHeight }
              item
              md={ 8 }
              sm={ 12 }
              spacing={ 1 }
              direction='column'
              alignItems='center'
              justify='center'
        >
          <Header/>
          <Grid container sm={ 6 } item>
            <Button fullWidth
                    variant='outlined'
                    color='primary'
                    onClick={ onSignInWithGoogle }
                    startIcon={ <GoogleIcon/> }
            >
              Entrar com Google
            </Button>
          </Grid>

          <Divider size={ 6 }/>

          <Grid container sm={ 6 } item>
            <TextField fullWidth
                       required
                       name='email'
                       id="id_auth_form_email"
                       label="E-mail"
                       variant="outlined"
                       type='email'
                       inputRef={ register(Validations.EMAIL) }
            />
            <InputInvalid errors={ errors } inputName='email'/>
          </Grid>
          <Grid container sm={ 6 } item>
            <TextField fullWidth
                       required
                       name='password'
                       id="id_auth_form_password"
                       label="Senha"
                       variant="outlined"
                       type='password'
                       inputRef={ register(Validations.PASSWORD) }
            />
            <InputInvalid errors={ errors } inputName='password'/>
          </Grid>
          <Grid container sm={ 6 } justify='flex-end' item>
            <Button variant='text'
                    color="primary"
                    onClick={ forgotPassword }
            >
              Esqueceu a senha?
            </Button>
          </Grid>
          <Grid container sm={ 6 } item>
            <Button fullWidth
                    variant="contained"
                    color="primary"
                    type='submit'
            >
              Entrar
            </Button>
          </Grid>
          <Grid container sm={ 6 } item>
            <Button fullWidth
                    variant="contained"
                    color="secondary"
                    type='submit'
                    onClick={ newAccount }
            >
              Criar conta
            </Button>
          </Grid>
          <Divider size={ 6 }/>
          <Grid container item sm={ 6 }>
            <Button fullWidth
                    variant='outlined'
                    color='primary'
                    onClick={ onShowMaps }
            >
              Só quero procurar um ônibus
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </form>
  );
}

function Header() {
  console.log('HEADER');
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
