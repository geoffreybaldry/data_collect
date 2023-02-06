import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ProSidebarProvider } from 'react-pro-sidebar'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>
)
