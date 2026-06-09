import { useState } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import Simulator from './components/Simulator';
import Comparativo from './components/Comparativo';
import logoForLight from '/logo-for-light.png';
import logoForDark from '/logo-for-dark.png';
import styles from './App.module.css';

function ThemeIcon({ dark }) {
  return dark ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function AppInner() {
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isComp = location.pathname === '/comparativo';

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <img
          src={dark ? logoForDark : logoForLight}
          alt="Bloxs"
          className={styles.logo}
        />
        <button className={styles.themeBtn} onClick={toggleTheme}>
          <ThemeIcon dark={dark} />
          {dark ? 'Modo claro' : 'Modo escuro'}
        </button>
      </header>

      <nav className={styles.navTabs}>
        <button
          className={`${styles.navTab} ${!isComp ? styles.navTabActive : ''}`}
          onClick={() => navigate('/' + location.search)}
        >
          Simulador
        </button>
        <button
          className={`${styles.navTab} ${isComp ? styles.navTabActive : ''}`}
          onClick={() => navigate('/comparativo' + location.search)}
        >
          Comparativo
        </button>
      </nav>

      {isComp ? <Comparativo /> : <Simulator />}

      <footer className={styles.footer}>
        Bloxs · Valores indicativos, sujeitos a alteração
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
