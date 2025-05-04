import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import toast, {ToastBar, Toaster} from 'react-hot-toast';
import App from './App.jsx'
// external css file
import "../src/assets/css/style.css"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
        <Toaster position="top-right"/>
    </StrictMode>
)
