import React, { ReactElement, useState } from 'react';
import { BlockUI } from '../index';
import { Consumer } from '../../models/types/Functions';

export interface WithBlockUIProps {
  isBlockingUI: boolean,
  setIsBlockingUI: Consumer<boolean>
}

export default function withBlockUI<T extends object>(Component: React.ComponentType<T>) {
  function WithBlockUI(props: any): ReactElement {
    const [ isBlockingUI, setIsBlockingUI ] = useState<boolean>(false);

    return (
      <BlockUI show={isBlockingUI}>
        <Component {...props} isBlockingUI={isBlockingUI} setIsBlockingUI={setIsBlockingUI}/>
      </BlockUI>);
  }

  return WithBlockUI;
}
