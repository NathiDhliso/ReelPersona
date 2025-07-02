import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css';

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome to your ReelPersona dashboard. From here you will eventually see saved assessments, completed reports and quick actions.
          </p>
        </header>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            Start New Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 