import React, { ReactElement, useState } from 'react';

import {
  Grid,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import {
  Header,
  TextFieldWithError,
  Divider,
  GoogleButton,
} from '../../../components';
import Validations from '../../../utils/Validations';
import UserService from '../../../services/UserService';
import { WithBlockUIProps, withBlockUI } from '../../../components/HOC';
import { User } from '../../../models/User';

const useStyles = makeStyles({
  minHeight: {
    minHeight: '100vh',
  },
});

function SignUp({ setIsBlockingUI }: WithBlockUIProps): React.ReactElement {
  const style = useStyles();
  const { register, handleSubmit, errors } = useForm();

  function onSuccess(user: User): void {

  }
  
  function onSuccessSignInWithGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline): void {
    setIsBlockingUI(false);
    UserService.createAccountWithGoogle({
      data: response as GoogleLoginResponse
    });
  }

  function onFailureSignInWithGoogle(response: any): void {
    setIsBlockingUI(false);
    console.log('ERR RES: ', response);
  }

  return (
    <Grid container
          className={style.minHeight}
          item
          xs={12}
          spacing={1}
          justify='center'
          alignItems='center'
    >
      <Grid container
            className={style.minHeight}
            item
            lg={5}
            md={10}
            sm={12}
            spacing={1}
            direction='column'
            alignItems='center'
            justify='center'
      >
        <Header />
        <Grid container
              sm={6}
              item
              justify='center'
              alignContent='center'
        >
          <TextFieldWithError errors={errors}
                              name='email'
                              fullWidth
                              required
                              id='id_new-account_email'
                              label='E-mail'
                              variant='outlined'
                              type='email'
                              space='10px'
                              inputRef={ register(Validations.EMAIL) }
          />
          <TextFieldWithError errors={errors}
                              name='password'
                              fullWidth
                              required
                              id='id_new-account_password'
                              label='Senha'
                              variant='outlined'
                              type='password'
                              space='15px'
                              inputRef={ register(Validations.PASSWORD) }
          />
          <Button fullWidth
                  variant='contained'
                  color='primary'
                  type='submit'
          >
            Criar conta
          </Button>
          <Divider marginTop='10px' marginBottom='10px'/>
          <GoogleButton onSuccess={onSuccessSignInWithGoogle}
                        onFailure={onFailureSignInWithGoogle}
                        onClick={() => setIsBlockingUI(true)}
                        buttonText='Criar conta com Google'
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withBlockUI(SignUp);

