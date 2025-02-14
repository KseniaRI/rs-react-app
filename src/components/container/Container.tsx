import { ReactNode } from 'react';
import styles from './Container.module.css';
import { useTheme } from '../../themeContext';

const Container = ({ children }: { children: ReactNode }) => {
  const darkTheme = useTheme();
  return (
    <div
      className={`${styles.container} ${darkTheme ? styles.dark : styles.light}`}
    >
      {children}
    </div>
  );
};

export default Container;
