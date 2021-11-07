import XXSS from '@components/XXSS';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Carrer de Josep Soldevila, 37 08030, Barcelona</p>
            <XXSS />
        </footer>
    );
};

export default Footer;
