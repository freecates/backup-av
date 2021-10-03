import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link href='/'>
                <a>
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src='/logo-backup-av.png'
                            alt='Backup AV Logo'
                            width={176}
                            height={64}
                            quality={100}
                        />
                    </span>
                </a>
            </Link>
        </footer>
    );
};

export default Footer;
