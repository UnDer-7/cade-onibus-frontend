import React, { ReactElement } from 'react';

import { Slide, Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import { Consumer } from '../models/types/Functions';

interface ToastProps {
  show: boolean,
  setShow: Consumer<boolean>,
  message: string,
  type?: Color
  duration?: number
}

export default function Toast(
  {
    show,
    setShow,
    message,
    duration = 5000,
    type = 'success',
  }: ToastProps
): ReactElement<ToastProps> {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={show}
      autoHideDuration={duration}
      onClose={() => {
        setShow(false);
      }}
      TransitionComponent={Slide}
    >
      <Alert severity={type} variant='filled' elevation={6}>{ message }</Alert>
    </Snackbar>
  );
}
