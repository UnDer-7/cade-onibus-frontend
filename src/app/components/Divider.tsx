import React, { CSSProperties } from 'react';

import { Grid } from '@material-ui/core';

interface Props {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
}

const style: CSSProperties = {
  border: '1px solid var(--primary-color)',
  borderRadius: 20,
  width: 'inherit',
};

export default function Divider({ size }: Props) {
  return (
    <Grid item container xs={ size }>
      <hr style={ style }/>
    </Grid>
  );
}

Divider.defaultProps = {
  size: 12,
};
