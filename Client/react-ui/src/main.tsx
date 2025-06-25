import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import Layout from './Pages/Layout'
import './i18n';
import './index.css';


declare global {
    interface Window {
        electronAPI: {
            openFileDialog: () => Promise<string | null>;
        };
    }
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  </React.StrictMode>,
)