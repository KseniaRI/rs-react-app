import { ReactNode } from 'react';
import Loader from './Loader';

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
      className="mainButton"
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
