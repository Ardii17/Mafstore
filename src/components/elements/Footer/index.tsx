import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.footer__row}>
        <div className={styles.footer__row__col}>
          <h4>Info</h4>
          <ul className={styles.footer__row__col__links}>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Compressions</a>
            </li>
            <li>
              <a href="#">Customers</a>
            </li>
            <li>
              <a href="#">Service</a>
            </li>
            <li>
              <a href="#">Collection</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer__row__col}>
          <h4>Explore</h4>
          <ul className={styles.footer__row__col__links}>
            <li>
              <a href="#">Free Designs</a>
            </li>
            <li>
              <a href="#">Latest Designs</a>
            </li>
            <li>
              <a href="#">Themes</a>
            </li>
            <li>
              <a href="#">Popular Designs</a>
            </li>
            <li>
              <a href="#">Art Skills</a>
            </li>
            <li>
              <a href="#">New Uploads</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer__row__col}>
          <h4>Legal</h4>
          <ul className={styles.footer__row__col__links}>
            <li>
              <a href="#">Customer Agreement</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">GDPR</a>
            </li>
            <li>
              <a href="#">Security</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
            <li>
              <a href="#">Media Kit</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer__row__col}>
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter for a weekly dose of news, updates,
            helpful tips, and exclusive offers.
          </p>
          <form action="#">
            <input type="text" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div className={styles.footer__row__col__icons}>
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-github"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
