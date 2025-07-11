import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import { loader } from '@monaco-editor/react';

import Layout from './Pages/Layout';
import './i18n';
import './index.css';

import type NativeBridge from "#/NativeBridge/index.d.ts";

declare global {
    interface Window extends NativeBridge {}
}

const rootElement = document.getElementById('root')

// todo: set loading screen here
rootElement!.innerHTML = `<div style="font-family:sans-serif;padding:2rem;text-align:center">Loading...</div>`;

loader.init().then(monaco => {
  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <ChakraProvider>
        <Layout />
      </ChakraProvider>
    </React.StrictMode>
  )
})