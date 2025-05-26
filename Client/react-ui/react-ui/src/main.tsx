import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import Home from './Pages/Home'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  </React.StrictMode>,
)