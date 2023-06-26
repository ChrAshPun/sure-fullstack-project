import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.Header}>
      <section className={styles.Section}>
        <h1>JobTrack</h1>
        <a href="https://github.com/ChrAshPun/sure-fullstack-project/" rel="noreferrer" target="_blank">GitHub</a>
      </section>
    </header>
  );
};

export default Header;