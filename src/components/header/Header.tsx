import { useTheme, useThemeUpdate } from '../../themeContext';
import Button from '../button/Button';
import styles from './Header.module.css';

const Header = () => {
  const toggleTheme = useThemeUpdate();
  const darkTheme = useTheme();

  return (
    <header className={styles.header}>
      <h3>SW Planets</h3>
      <Button type="button" onClick={toggleTheme}>
        {darkTheme ? 'Light theme' : 'Dark theme'}
      </Button>
    </header>
  );
};

export default Header;
