import React, { CSSProperties, ReactElement } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldErrors } from 'react-hook-form';

import { InputInvalid } from './index';
import Assert from '../utils/Assert';

type propType<T> = TextFieldProps & {
  space: string
  errors: FieldErrors<T>,
  name: string
};

export default function TextFieldWithError<T = any>(props: propType<T>): ReactElement<propType<T>> {
  const { name, errors, space } = props;
  Assert.notBlank(name);
  Assert.notNull(errors);

  const style: CSSProperties = {
    width: '100%',
    marginBottom: space
  };

  return (
    <>
      <TextField { ...props }/>
      <InputInvalid errors={ errors } inputName={ name as string }/>
      <div style={style}/>
    </>
  );
}

TextFieldWithError.defaultProps = {
  space: '0px'
};
