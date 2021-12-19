import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { SalaryContextProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <SalaryContextProvider>
      <App />
    </SalaryContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
