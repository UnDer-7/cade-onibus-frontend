import React, { ReactElement } from 'react';

import Loader, { LoaderType } from 'react-loaders';
import EnvVariables from '../utils/EnvironmentVariables';

interface LoadingProps {
  type: LoaderType,
  color?: string,
  active?: boolean,
}

export default function Loading({
                                  type,
                                  color = EnvVariables.PRIMARY_COLOR,
                                  active = true,
}: LoadingProps): ReactElement<LoadingProps> {
  // @ts-ignore
  return <Loader type={type} active={active} color={color} />;
}
