import React from 'react';

import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  function goTo() {
    history.replace('/auth/signin');
  }

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={goTo}>GO</button>
    </div>
  );
}
