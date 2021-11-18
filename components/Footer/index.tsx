import XXSS from '@components/XXSS';
import Nav from '@components/Nav';
import { IRoute } from '@interfaces/index';
import styles from './Footer.module.scss';

type FooterProps = {
    otherRoutes?: IRoute[];
};

const Footer: React.FC<FooterProps> = ({ otherRoutes }) => {
    return (
        <footer className={styles.footer}>
            <p>Carrer de Josep Soldevila, 37 08030, Barcelona</p>
            <XXSS />
            {otherRoutes && otherRoutes.length ? <Nav navRoutes={otherRoutes} small noButton /> : null}
        </footer>
    );
};

export default Footer;
