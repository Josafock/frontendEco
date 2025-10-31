'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error RSC:', error);
  }, [error]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Ocurrió un error</h1>
      {error.digest && <p>Digest: <code>{error.digest}</code></p>}
      <button onClick={() => reset()}>Reintentar</button>
    </div>
  );
}
