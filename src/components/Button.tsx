import { ReactNode } from 'react';
import Loader from './Loader';

interface ButtonProps {
  children: ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
  loading?: boolean;
  onClick?: () => void;
}
const Button = ({ children, type, loading, onClick }: ButtonProps) => {
  return (
    <button className="mainButton" type={type} onClick={onClick}>
      {loading && <Loader />}
      {children}
    </button>
  );
};

export default Button;
