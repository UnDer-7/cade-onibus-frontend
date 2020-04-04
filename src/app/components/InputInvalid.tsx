import React, { CSSProperties } from 'react';
import { FieldErrors } from 'react-hook-form';

const styles: CSSProperties = {
  color: 'red',
  marginTop: '5px',
};

interface Props<T> {
  errors: FieldErrors<T>;
  inputName: string;
}

export default function InputInvalid<T>({ errors, inputName }: Props<T>) {
  // @ts-ignore
  const err = errors[inputName];

  if (err) return <span style={ styles }>{ err.message }</span>;
  return null;
}
