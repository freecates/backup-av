import Layout from '@components/layout';
import Image from 'next/image';
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
                            backgroundImage: `url(${staticDataUrl}assets/img/backup-av-carillo-del-palau.webp)`,
                            backgroundColor: '#5884b7',
                        }}
                    >
                        <div className={styles['logo-project']}>
                            <Image
                                src={`${staticDataUrl}assets/img/logo-generalitat-de-catalunya-presidencia.svg`}
                                alt=''
                                width='250'
                                height='150'
                            />
                        </div>
                        <div className={styles['featured-project-card']}>
                            <h2>Carrilló de la Presidència</h2>
                            <hr />
                            <p>
                                Muntatge de la càmera i els micròfons per retransmetre, en directe i
                                per streaming, la tocada del Carrilló del Palau de la Generalitat de
                                Catalunya.
                            </p>
                        </div>
                    </div>
                    <div className={styles['project']}>
                        <div className={styles['project-img']}>
                            <div className={styles['bg-project-img']} style={{
                            backgroundImage: `url(${staticDataUrl}assets/img/backup-av-santa-maria-de-pedralbes.webp)`,
                        }}>
                                <Image
                                    src={`${staticDataUrl}assets/img/logo-santa-maria-de-pedralbes.svg`}
                                    alt=''
                                    loading='lazy'
                                    width='250'
                                    height='150'
                                />
                            </div>
                        </div>
                        <div className={styles['project-description']}>
                            <h2 style={{ maxWidth: '260px' }}>Reial Monestir de Santa Maria de Pedralbes</h2>
                            <p style={{ maxWidth: '290px' }}>
                            Digitalització dels equips audiovisuals de la Sala d’Actes del Reial Monestir de Santa Maria de Pedralbes.
                            </p>
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
