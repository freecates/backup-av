import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Button from '@components/button';
import { GetStaticProps, NextPage } from 'next';
import { IRoute } from '@interfaces/index';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

interface Props {
    routes: IRoute[];
}

const Clientes: NextPage<Props> = ({ routes }) => {
    return (
        <Layout
            pageTitle={'Proyectos'}
            pageDescription={'Proyectos Backup AV'}
            siteTitle={'Proyectos Backup AV'}
            navRoutes={routes}
        >
            <div className={styles['with-portfolio']}>
                <div className={`${styles.container}`}>
                    <main className={styles.main}>
                        <h1 className={styles.title}>Vuestros proyectos son nuestro hogar</h1>
                        <p className={styles.description}>
                            Aquí hay algunos que nos encantaría compartir.
                        </p>
                        <div className={styles['button-wrapper']}>
                            <Button name={'Contacta'} isAnchor url={'/contacta'} />
                        </div>
                    </main>
                </div>
            </div>
            <div className={styles['bg-projects']}>
                <div className={styles['portfolio-container']}>
                    <div
                        className={styles['featured-project']}
                        style={{
                            backgroundImage:
                                `url(${staticDataUrl}assets/img/backup-av-carillo-del-palau.webp)`,
                            backgroundColor: '#5884b7',
                        }}
                    >
                        <div className={styles['logo-project']}>
                            <img
                                src='https://images.prismic.io/monogram/a769cac1-e373-4313-871a-f4f72dd9b7d8_m-logo.svg?auto=compress,format'
                                alt=''
                                width='232'
                                height='167'
                                className='flex-1'
                                style={{ maxWidth: '250px', maxHeight: '125px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [routes] = await Promise.all([api.routes.getData()]);

    return {
        props: {
            routes,
        },
        revalidate: 1,
    };
};

export default Clientes;
