import React, { ReactElement, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AxiosResponse } from 'axios';
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { PasswordWithEmail } from '../../../models/types/SignInTypes';
import { FORGOT_PASSWORD_PATH, NEW_ACCOUNT_PATH } from '../AuthRoutes';
import EnvVariables from '../../../utils/EnvironmentVariables';
import Validations from '../../../utils/Validations';
import AuthService from '../../../services/AuthService';
import {
  GoogleIcon,
  Divider,
  InputInvalid,
  Toast,
  BlockUI,
} from '../../../components';
import ServerErrorMessages from '../../../utils/ServerErrorMessages';

const useStyles = makeStyles({
  minHeight: { minHeight: '100vh' },
});

export default function SignIn(): ReactElement {
  // HOOKS
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<PasswordWithEmail>();
  const [ isBlockingUI, setIsBlockingUI ] = useState<boolean>(false);
  const [ isShowingErrorToast, setIsShowingErrorToast ] = useState<boolean>(false);
  const [ errorToastMsg, setErrorToastMsg ] = useState<string>('');

  // FUNCTIONS
  function onSignInWithEmail(data: PasswordWithEmail): void {
    function onError(err: AxiosResponse<string>): void {
      function setErro(msg: string): void {
        setErrorToastMsg(msg);
        setIsShowingErrorToast(true);
      }

      if (err.status === 404) {
        setErro('Usuário não encontrado');
      } else if (err.status === 400 && err.data === ServerErrorMessages.INVALID_CREDENTIALS) {
        setErro('Credenciais inválidas');
      } else if (err.status === 400 && err.data === ServerErrorMessages.EMAIL_USED_ON_GOOGLE) {
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
      console.error(`Google sign in erro: \n${response}`);
    }
  }

  function onShowMaps(): void {
    console.log('---- SHOW MAPS ----');
  }

  function forgotPassword(): void {
    history.push(FORGOT_PASSWORD_PATH);
  }

  function newAccount(): void {
    history.push(NEW_ACCOUNT_PATH);
  }

  return (
    <>
      <Toast
        show={isShowingErrorToast}
        setShow={setIsShowingErrorToast}
        message={errorToastMsg}
        type='error'
      />
      <BlockUI show={isBlockingUI}>
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
                <GoogleLogin
                  clientId={ EnvVariables.GOOGLE_CLIENT_ID }
                  onSuccess={ onSuccessSignInWithGoogle }
                  onFailure={ onFailureSignInWithGoogle }
                  render={(renderProps) => (
                    <Button fullWidth
                            variant='outlined'
                            color='primary'
                            onClick={ () => {
                              renderProps.onClick();
                              setIsBlockingUI(true);
                            } }
                            startIcon={ <GoogleIcon/> }
                    >
                      Entrar com Google
                    </Button>
                  )}
                />
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
      </BlockUI>
    </>
  );
}

function Header(): ReactElement {
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
