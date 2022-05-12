// Imports
// ========================================================
import * as React from 'react';
import { hydrate } from 'react-dom';
import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from 'remix';

import { ClientStyleContext } from './providers/context';
import { createEmotionCache } from './createEmotionCache';

// Types
interface ClientCacheProviderProps {
  children: React.ReactNode;
}

// Main Client Cache Provider
// ========================================================
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
