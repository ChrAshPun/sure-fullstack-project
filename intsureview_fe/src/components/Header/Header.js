import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.Header}>
      <section className={styles.Section}>
        <h1>JobTrack</h1>
      </section>
    </header>
  );
};

export default Header;