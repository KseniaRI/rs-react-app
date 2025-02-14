import { useTheme, useThemeUpdate } from '../../themeContext';
import Button from '../button/Button';
import styles from './Header.module.css';

const Header = () => {
  const toggleTheme = useThemeUpdate();
  const darkTheme = useTheme();
  return (
    <header className={styles.header}>
      <Button type="button" onClick={toggleTheme}>
        {darkTheme ? 'light theme' : 'dark theme'}
      </Button>
    </header>
  );
};

export default Header;
