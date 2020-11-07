import React, { ReactElement } from 'react';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Button, PropTypes } from '@material-ui/core';

import { GoogleIcon } from './index';
import EnvVariables from '../utils/EnvironmentVariables';
import { Consumer, Runnable } from '@cade-tecnologia/essentials';

type props = {
  onSuccess: Consumer<GoogleLoginResponse | GoogleLoginResponseOffline>,
  onFailure: Consumer<any>,
  onClick: Runnable,
  buttonText: string,
  fullWidth: boolean;
  variant: 'text' | 'outlined' | 'contained';
  color: PropTypes.Color;
}

export default function GoogleButton(props: props): ReactElement {
  const {
    onSuccess,
    onFailure,
    onClick,
    buttonText,
    fullWidth,
    variant,
    color,
  } = props;

  function renderButton(renderProps: { onClick: Runnable }): ReactElement {
    return (
      <Button fullWidth={fullWidth}
              variant={variant}
              color={color}
              onClick={ () => {
                onClick();
                renderProps.onClick();
              } }
              startIcon={ <GoogleIcon/> }
      >
        { buttonText }
      </Button>
    );
  }

  return (
    <GoogleLogin
      clientId={ EnvVariables.GOOGLE_CLIENT_ID }
      onSuccess={ onSuccess }
      onFailure={ onFailure }
      render={ renderButton }
    />
  );
}

GoogleButton.defaultProps = {
  fullWidth: true,
  variant: 'outlined',
  color: 'primary',
};
