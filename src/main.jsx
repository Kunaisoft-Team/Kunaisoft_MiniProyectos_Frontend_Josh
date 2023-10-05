import React    from 'react'
import ReactDOM       from 'react-dom/client'
import GlobalProvider from './utils/redux/GlobalProvider'
import App            from './App.jsx'
import './static/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
)
