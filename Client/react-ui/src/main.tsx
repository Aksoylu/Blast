import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import { loader } from '@monaco-editor/react';

import './i18n';
import './index.css';

import type NativeBridge from "#/NativeBridge/index.d.ts";
import { useMainStore } from './MainStore';
import { useEffect } from 'react';
import { App } from './App';

declare global {
  interface Window extends NativeBridge { }
}

const rootElement = document.getElementById('root')

// todo: set loading screen here
rootElement!.innerHTML = `<div style="font-family:sans-serif;padding:2rem;text-align:center">Loading...</div>`;

loader.init().then(async (monaco) => {
  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  )
})
