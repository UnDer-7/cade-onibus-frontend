import React, { CSSProperties } from 'react';

import { Grid } from '@material-ui/core';

interface Props {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  marginTop: string,
  marginBottom: string,
}

const style: CSSProperties = {
  border: '1px solid var(--primary-color)',
  borderRadius: 20,
  width: 'inherit',
};

export default function Divider({ size, marginBottom, marginTop }: Props) {
  return (
    <>
      <div style={ { width: '100%', marginTop } }/>
      <Grid item container xs={ size }>
        <hr style={ style }/>
      </Grid>
      <div style={ { width: '100%', marginBottom } }/>
    </>
  );
}

Divider.defaultProps = {
  size: 12,
  marginTop: '0px',
  marginBottom: '0px',
};
