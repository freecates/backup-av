import Link from 'next/link';
import Layout from '@components/Layout';
import styles from '@styles/Page.module.scss';
import Image from 'next/image';

export default function Custom404() {
    return (
        <Layout
            siteTitle={'404 | Página no encontrada'}
            pageTitle={'Backup Audiovisuals'}
            pageDescription={
                'Se ha producido un error 404. Página no encontrada. Por favor, vuelve a la página de inicio'
            }
            navRoutes={null}
        >
            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        <Link href={'/'}>
                            <a>
                                <Image
                                    src='/logo-backup-av.png'
                                    alt={'404 | Página no encontrada'}
                                    width={176}
                                    height={64}
                                    quality={100}
                                />
                            </a>
                        </Link>
                        <br />
                        Se ha producido un error 404
                        <br />
                        <small>[Página no encontrada]</small>
                    </h1>
                    <p>
                        Por favor, vuelve a la página de{' '}
                        <Link href='/'>
                            <a>Inicio</a>
                        </Link>
                        .
                    </p>
                </main>
            </div>
        </Layout>
    );
}
