import { ReactNode } from 'react';
import Loader from '../loader/Loader';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  type: 'submit' | 'button';
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
const Button = ({
  children,
  type,
  loading,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={styles.mainButton}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && <Loader />}
      {children}
    </button>
  );
};

export default Button;
