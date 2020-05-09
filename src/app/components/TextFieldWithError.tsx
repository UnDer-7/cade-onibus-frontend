import React, { ReactElement } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldErrors } from 'react-hook-form';

import { InputInvalid } from './index';
import Assert from '../utils/Assert';

type propType<T> = TextFieldProps & {
  errors: FieldErrors<T>,
  name: string
};

export default function TextFieldWithError<T = any>(props: propType<T>): ReactElement<propType<T>> {
  const { name, errors } = props;
  Assert.notBlank(name);
  Assert.notNull(errors);

  return (
    <>
      <TextField { ...props }/>
      <InputInvalid errors={ errors } inputName={ name as string }/>
    </>
  );
}
