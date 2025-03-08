import styles from './Fallback.module.css';

const Fallback = () => {
  return (
    <p className={styles.fallback}>
      ErrorBoundary message: Something went wrong
    </p>
  );
};

export default Fallback;
