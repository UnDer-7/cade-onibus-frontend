import React, { ReactElement, useEffect, useState } from 'react';

import { Button, Grid, InputLabelProps, makeStyles, Paper, Typography, } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { Color } from '@material-ui/lab';

import Validations from '../../../utils/Validations';
import { BlockUI, TextFieldWithError, Toast } from '../../../components';
import useQueryParam from '../../../hooks/useQueryParams';
import JWT, { RecoveryPayload } from '../../../models/JWT';
import { AuthService, UserService } from '../../../services';

const useStyles = makeStyles({
  centerGrid: { minHeight: '100vh' },
  paddingContent: {
    padding: '2px 10px 10px 10px',
    marginLeft: '5px',
    marginRight: '5px'
  },
  largeMarginButton: {
    marginBottom: '50px',
  },
  minimumMarginButton: {
    marginBottom: '10px',
  }
});

interface FormData {
  recoveryEmail: string,
  password?: string,
}

export default function ForgotPassword(): ReactElement {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm<FormData>();
  const { token } = useQueryParam();

  // STATE
  const [isBlockingUI, setIsBlockingUI] = useState<boolean>(false);
  const [toastType, setToastType] = useState<Color>('error');
  const [isShowingToast, setIsShowingToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');
  const [recoveryJWT, setRecoveryJWT] = useState<JWT<RecoveryPayload> | null>(null);

  const inputLabelProps: Partial<InputLabelProps> = recoveryJWT
    ? { shrink: true }
    : {};
  const title = recoveryJWT
    ? 'Troca de senha'
    : 'Esqueci a senha';
  const subTitle = recoveryJWT
    ? 'Digite sua nova senha'
    : 'Digite seu endereço de e-mail abaixo e enviaremos um link para redefinir sua senha';
  const onComplete = () => setIsBlockingUI(false);

  useEffect(() => {
    const onSuccess = (data: JWT<RecoveryPayload>) => {
      setRecoveryJWT(data);
      reset({
        recoveryEmail: data.payload.email
      });
    };

    if (token) {
      setIsBlockingUI(true);

      AuthService.isRecoveryPasswordTokenValid({
        data: token,
        onComplete,
        onSuccess,
      });
    }
  }, [reset, token]);

  function sendEmail(recoveryEmail: string): void {
    function onError(err: AxiosResponse): void {
      function setErro(msg: string): void {
        setIsShowingToast(true);
        setToastMsg(msg);
      }

      switch (err?.status) {
        case 500:
          setErro('Não foi possivel enviar o email');
          break;
        case 404:
          setErro('Nenhum usuário encontrado com esse email');
          break;
        default:
          setErro('Algo deu errado');
          break;
      }
    }

    function onSuccess(): void {
      setToastType('success');
      setToastMsg('E-mail enviado com sucesso');
      setIsShowingToast(true);
    }

    setIsBlockingUI(true);
    AuthService.sendRecoveryEmail({
      data: recoveryEmail,
      onComplete,
      onError,
      onSuccess,
    });
  }

  function resetPassword(password: string): void {
    setIsBlockingUI(true);

    UserService.updatePassword({
      data: {
        password,
        token: recoveryJWT!.token
      },
      onComplete
    });
  }

  function submit({ password, recoveryEmail }: FormData): void {
    if (password) resetPassword(password);
    else sendEmail(recoveryEmail);
  }

  return (
    <>
      <Toast show={ isShowingToast }
             setShow={ setIsShowingToast }
             message={ toastMsg }
             type={ toastType }
      />
      <BlockUI show={ isBlockingUI }>
        { (!isBlockingUI || !token) && (
          <Grid container
                item
                justify='center'
                alignItems='center'
                xs={ 12 }
                className={ classes.centerGrid }>
            <Paper className={ classes.paddingContent } elevation={ 4 }>
              <Typography color='textPrimary' variant='h4' align='center'>{ title }</Typography>
              <Typography color='textSecondary'
                          variant='subtitle1'
                          align='center'
                          className={ classes.largeMarginButton }
              >{ subTitle }</Typography>
              <form onSubmit={ handleSubmit(submit) } noValidate>
                <TextFieldWithError fullWidth
                                    required={ !recoveryJWT }
                                    disabled={ !!recoveryJWT }
                                    InputLabelProps={ inputLabelProps }
                                    InputProps={ {
                                      readOnly: !!recoveryJWT,
                                    } }
                                    label='E-email'
                                    variant='outlined'
                                    type='email'
                                    name='recoveryEmail'
                                    id='id_forgot_password-recoveryEmail'
                                    inputRef={ register(Validations.EMAIL) }
                                    className={ classes.minimumMarginButton }
                                    errors={ errors }
                />
                { token && (<TextFieldWithError errors={ errors }
                                                fullWidth
                                                required
                                                label='Nova Senha'
                                                variant='outlined'
                                                type='password'
                                                name='password'
                                                id='id_forgot_password-newPassword'
                                                inputRef={ register(Validations.PASSWORD) }
                                                className={ classes.minimumMarginButton }
                />) }
                <Button fullWidth
                        variant='contained'
                        color='primary'
                        type='submit'
                >
                  Enviar
                </Button>
              </form>
            </Paper>
          </Grid>
        ) }
      </BlockUI>
    </>
  );
}
