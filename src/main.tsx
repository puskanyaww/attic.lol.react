import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { GlobalStyles } from './styled.ts';
import './utils/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles/>
    <App/>
  </StrictMode>,
)