import React from 'react';

import { useRoutes } from '../../hooks';

export default function Home() {
  const { goToSignIn } = useRoutes();

  function goTo() {
    goToSignIn();
  }

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={goTo}>GO</button>
    </div>
  );
}
