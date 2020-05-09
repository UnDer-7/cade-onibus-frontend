import React, { PropsWithChildren, ReactElement } from 'react';

import BlockUi from 'react-block-ui';
import { Loading } from './index';

interface BlockUIProps {
  show: boolean
  loader?: ReactElement,
}

export default function BlockUI(
  { children,
    show,
    loader = <Loading type='ball-pulse' />
  }: PropsWithChildren<BlockUIProps>): ReactElement<PropsWithChildren<BlockUIProps>> {
  return (
    <BlockUi blocking={show} loader={loader}>
      {children || (<div style={{minHeight: '100vh'}}/>)}
    </BlockUi>
  );
}
