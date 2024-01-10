import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './app.tsx'

import 'virtual:uno.css'
import './index.css'

const mainDiv = document.getElementById('app')

if (mainDiv) {
  const root = createRoot(mainDiv)

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error('appDiv is null')
}
