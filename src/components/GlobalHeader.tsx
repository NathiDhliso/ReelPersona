import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GlobalHeader.module.css';

const GlobalHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>ReelPersona</div>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">Assessment</Link>
        <Link className={styles.link} to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
};

export default GlobalHeader; 