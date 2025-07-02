import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import { fetchAssessments, deleteAssessment } from '../lib/assessment.service';
import { useAuthStore } from '../lib/auth';
import type { Database } from '../types/supabase';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Database['public']['Tables']['assessments']['Row'][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      try {
        const data = await fetchAssessments(user.id);
        setAssessments(data);
      } catch (err) {
        console.error('Failed to load assessments', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this assessment?')) return;
    try {
      await deleteAssessment(id);
      setAssessments(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome to your ReelPersona dashboard. From here you can review past assessments or start a new one.
          </p>
        </header>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            Start New Assessment
          </Link>
        </div>

        {loading ? (
          <p style={{ marginTop: '1rem' }}>Loading assessments…</p>
        ) : assessments.length === 0 ? (
          <p style={{ marginTop: '1rem' }}>No assessments yet.</p>
        ) : (
          <div className={styles.list}>
            {assessments.map(a => (
              <div key={a.id} className={styles.item}>
                <div className={styles.itemMeta}>
                  <strong>Assessment</strong>
                  <span className={styles.itemDate}>{new Date(a.created_at || '').toLocaleString()}</span>
                </div>
                <div className={styles.itemActions}>
                  <button
                    className={`${styles.actionButton} ${styles.viewButton}`}
                    onClick={() => navigate('/portfolio', { state: { profile: a.profile } })}
                  >
                    View
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDelete(a.id as string)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 