import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Nav.module.scss';
import { IRoute } from '@interfaces/index';
import Button from '@components/Button';

type NavProps = {
    navRoutes: IRoute[];
    title?: string;
    small?: boolean;
    noButton?: boolean;
};

const Nav: React.FC<NavProps> = ({ navRoutes, title, small, noButton }) => {
    const home = navRoutes.filter((x) => x.route === '/');
    const routes = navRoutes.filter((x) => x.route !== '/');
    const router = useRouter();

    return (
        <nav className={`${styles.nav} ${small ? styles.small : ''}`}>
            <ul className={styles.main}>
                {home.map((h, index) => (
                    <li key={index} className={router.pathname === h.route ? styles.active : ''}>
                        <Link href={h.route}>
                            <a>
                                <Image
                                    src='/logo-backup-av.png'
                                    alt={title}
                                    width={176}
                                    height={64}
                                    quality={100}
                                />
                            </a>
                        </Link>
                    </li>
                ))}
                <li className={styles['routes-wrapper']}>
                    <ul className={styles.secondary}>
                        {routes.map((route, index) => (
                            <li
                                key={index}
                                className={`${
                                    router.pathname.includes(route.route) ? styles.active : ''
                                }`}
                            >
                                <Link href={route.route}>{route.name}</Link>
                            </li>
                        ))}
                    </ul>
                </li>
                {noButton ? null : (
                    <li className={`${styles['contact-wrapper']}`}>
                        <Button
                            name={'Contacta'}
                            isAnchor
                            isActive={router.pathname === '/contacta'}
                            isSmall
                            url={'/contacta'}
                            noShadow
                        />
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
