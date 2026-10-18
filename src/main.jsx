import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux";
// import appStore from "../src/utils/AppStore.jsx"
import appStore from "./utils/AppStore.jsx";  
import App from './App.jsx';
import './index.css'


createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
  </Provider>,
)
