import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // picks the specific named from file
import './index.css'
import App from './App.jsx' 
import { BrowserRouter } from 'react-router' // a component that handles client-side routing

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </StrictMode>,
)
