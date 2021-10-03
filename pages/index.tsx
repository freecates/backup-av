import type { GetStaticProps, NextPage } from 'next';
import api from '@libs/api.js';
import styles from '../styles/Home.module.scss';
import Layout from '@components/layout';
import Button from '@components/button';
import { IRoute } from '@interfaces/index';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;

interface Props {
    routes: IRoute[];
};

const Home: NextPage<Props> = ({ routes }) => {
    return (
        <Layout
            titlePage={'siteTitle'}
            navRoutes={routes}
            pageTitle={'backupTitle'}
            pageDescription={'backupDescription'}
            home
        >
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>Integración de sistemas audiovisuales</h1>
                    <p className={styles.description}>
                        En{' '}
                        <span className={'backup'}>
                            BACK<span>UP</span>
                        </span>{' '}
                        nos focalizamos en la integración de sistemas y servicios audiovisuales para
                        tu empresa y en una amplia variedad de espacios. Nos vala una trayectoria solvente de más de 20 años.
                    </p>
                    <div className={styles['button-wrapper']}>
                        <Button name={'Contacta'} isAnchor url={'/contacta'} />
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(`${wordPressApiUrl}/wp/v2/pages?per_page=100&_embed`, {
        headers: { 'Cache-Control': 'no-cache' },
    });
    const wpPageData = await res.json();

    const [routes] = await Promise.all([api.routes.getData()]);

    return {
        props: {
            wpPageData: wpPageData,
            routes,
        },
        revalidate: 1,
    };
};

export default Home;
