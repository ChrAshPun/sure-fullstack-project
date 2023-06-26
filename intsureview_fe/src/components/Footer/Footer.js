import styles from './Footer.module.css'
import facebook from '../../assets/facebook.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div>
        <div className={styles.TopRow}>
          <div className={styles.JobTrack}>
            <h1>JobTrack</h1>
            <p>Company</p>
            <p>Careers</p>
            <p>Contact</p>
          </div>
          <div  className={styles.TopRowRightSide}>
            <div className={styles.PlatformFeatures}>
              <h2>Platform features</h2>
              <p>Distribution</p>
              <p>Policy</p>
              <p>Claims</p>
              <p>API</p>
            </div>
            <div className={styles.Resources}>
              <h2>Resources</h2>
              <p>Newsroom</p>
              <p>Blog</p>
              <p>Press</p>
            </div>
          </div>
        </div>
        <div className={styles.BottomRow}>
          <div className={styles.SocialMediaIcons}>
            <img src={facebook} alt="facebook"/>
            <img src={twitter} alt="twitter"/>
            <img src={linkedin} alt="linkedin"/>
          </div>
          <p className={styles.Message}>JobTrack by Christina Punla</p>
          <p className={styles.Message}>JobTrack, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;