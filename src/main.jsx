import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import i18n from './i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Toaster position="top-right" />
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>,
)
