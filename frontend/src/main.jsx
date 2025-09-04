import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import { ToastContainer} from 'react-toastify';
import App from './App.jsx'
// external css file
import "../src/assets/css/style.css"
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import {AuthProvider} from "./context/AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App/>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            toastStyle={{
                width:"250px",
                minHeight: '32px',
                fontSize: '14px',
            }}
        />
    </AuthProvider>
)
