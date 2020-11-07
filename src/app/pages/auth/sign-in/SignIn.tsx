import React, { ReactElement, useState } from 'react';

import { useForm } from 'react-hook-form';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AxiosResponse } from 'axios';
import {
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';

import { PasswordWithEmail } from '../../../models/types/SignInTypes';
import Validations from '../../../utils/Validations';
import AuthService from '../../../services/AuthService';
import {
  Divider,
  Toast,
  Header,
  TextFieldWithError,
  GoogleButton,
} from '../../../components';
import { withBlockUI, WithBlockUIProps } from '../../../components/HOC';
import ServerErrorMessages from '../../../utils/ServerErrorMessages';
import { useRoutes } from '../../../hooks';

const useStyles = makeStyles({
  minHeight: { minHeight: '100vh' },
});

function SignIn({ setIsBlockingUI }: WithBlockUIProps): ReactElement {
  // HOOKS
  const classes = useStyles();
  const {
    goToSignUp,
    goToForgotPassword,
  } = useRoutes();

  const { register, handleSubmit, errors } = useForm<PasswordWithEmail>();
  const [ isShowingErrorToast, setIsShowingErrorToast ] = useState<boolean>(false);
  const [ errorToastMsg, setErrorToastMsg ] = useState<string>('');

  // FUNCTIONS
  function onSignInWithEmail(data: PasswordWithEmail): void {
    function onError(err: AxiosResponse<string>): void {
      if (err.status === 400 && err.data === ServerErrorMessages.EMAIL_USED_ON_GOOGLE) {
        throw new Error('IMPLEMENTAR ESSA MERDA!!!');
      }
    }
    const onComplete = () => setIsBlockingUI(false);
    setIsBlockingUI(true);

    AuthService.signInWithEmail({ data, onComplete, onError });
  }

  function onSuccessSignInWithGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline): void {
    setIsBlockingUI(false);
    AuthService.signInWithGoogle(response as GoogleLoginResponse);
  }

  function onFailureSignInWithGoogle(response: any): void {
    setIsBlockingUI(false);
    if (response?.error !== 'popup_closed_by_user') {
      setIsShowingErrorToast(true);
      setErrorToastMsg('Erro ao realizar login com Google');
      // eslint-disable-next-line no-console
      console.error(`Google sign in erro: `, response);
    }
  }

  function onShowMaps(): void {
    console.log('---- SHOW MAPS ----');
  }

  function forgotPassword(): void {
    goToForgotPassword();
  }

  function newAccount(): void {
    goToSignUp();
  }

  return (
    <>
      <Toast
        show={isShowingErrorToast}
        setShow={setIsShowingErrorToast}
        message={errorToastMsg}
        type='error'
      />
      <form onSubmit={ handleSubmit(onSignInWithEmail) } noValidate>
        <Grid container
              className={ classes.minHeight }
              item
              xs={ 12 }
              spacing={ 1 }
              justify='center'
              alignItems='center'
        >
          <Grid container
                className={ classes.minHeight }
                item
                lg={ 5 }
                md={ 10 }
                sm={ 12 }
                spacing={ 1 }
                direction='column'
                alignItems='center'
                justify='center'
          >
            <Header/>
            <Grid container sm={ 6 } item>
              <GoogleButton onSuccess={ onSuccessSignInWithGoogle }
                            onFailure={ onFailureSignInWithGoogle }
                            onClick={ () => setIsBlockingUI(true) }
                            buttonText='Entrar com Google' />
            </Grid>

            <Divider size={ 6 }/>

            <Grid container sm={ 6 } item>
              <TextFieldWithError errors={errors}
                                  name='email'
                                  fullWidth
                                  required
                                  id='id_sign-in_email'
                                  label='E-mail'
                                  variant='outlined'
                                  type='email'
                                  inputRef={ register(Validations.EMAIL) }
              />
            </Grid>
            <Grid container sm={ 6 } item>
              <TextFieldWithError fullWidth
                                  required
                                  errors={errors}
                                  name='password'
                                  id='id_sign-in_password'
                                  label='Senha'
                                  variant='outlined'
                                  type='password'
                                  inputRef={ register(Validations.PASSWORD) }
              />
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
    </>
  );
}

export default withBlockUI(SignIn);
