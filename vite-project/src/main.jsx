import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/Profile/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <AuthProvider>
        <App />
      </AuthProvider>
    
  </StrictMode>
);
