import { FaPhone, FaEnvelope, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './XXSS.module.scss';

const XXSS = () => (
    <div className={styles.xxss}>
        <a
            target='_blank'
            rel={'noopener nofollow noreferrer'}
            href='tel:0034936050637'
            title={'Llamar al Teléfono de Backup AV'}
        >
            <span>
                <FaPhone />
            </span>
        </a>
        <a
            target='_blank'
            rel={'noopener nofollow noreferrer'}
            href='mailto:info@backup-av.com'
            title={'Enviar un correo-e a Backup AV'}
        >
            <span>
                <FaEnvelope />
            </span>
        </a>
        <a
            target='_blank'
            rel={'noopener nofollow noreferrer'}
            href='https://www.instagram.com/backup_audiovisuals/'
            title={'Ir al Instagram de Backup AV'}
        >
            <span>
                <FaInstagram />
            </span>
        </a>

        <a
            target='_blank'
            rel={'noopener nofollow noreferrer'}
            href='https://www.linkedin.com/company/backup-audiovisuals/'
            title={'Ir al Linkedin de Backup AV'}
        >
            <span>
                <FaLinkedin />
            </span>
        </a>
    </div>
);

export default XXSS;
