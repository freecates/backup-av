import type { GetStaticProps, NextPage } from 'next';
import api from '@libs/api.js';
import styles from '../styles/Home.module.scss';
import Layout from '@components/layout';
import Button from '@components/button';
import { IRoute, IMeta } from '@interfaces/index';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;

interface Props {
    routes: IRoute[];
    backup: {
        meta: IMeta;
        content: {
            description: string;
        };
    };
    features: [{ title: string; featureList: string[] }];
}

const Home: NextPage<Props> = ({ routes, backup, features }) => {
    return (
        <Layout
            titlePage={backup.meta.title}
            navRoutes={routes}
            pageTitle={backup.meta.pageTitle}
            pageDescription={backup.meta.pageDescription}
            home
        >
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{backup.meta.title}</h1>
                    <p
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html: backup.content.description,
                        }}
                    ></p>
                    <div className={styles['button-wrapper']}>
                        <Button name={'Contacta'} isAnchor url={'/contacta'} />
                    </div>
                    <div role='region' aria-labelledby='features'>
                        <div className={'wrapper'}>
                            <h2>
                                ¿Por qué{' '}
                                <span className={'backup'}>
                                    BACK<span>UP</span>
                                </span>
                                ?
                            </h2>
                            <p>Líderes del sector confían en nuestros servicios</p>
                            <div className={styles['grid']}>
                                {features.map((f) => (
                                    <div key={f.title} className={styles['card']}>
                                        <p>{f.title}</p>
                                        <ul>
                                            {f.featureList.map((l) => (
                                                <li key={l}>{l}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
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

    const [backup, features, routes] = await Promise.all([
        api.backup.getData(),
        api.features.getData(),
        api.routes.getData(),
    ]);

    return {
        props: {
            wpPageData: wpPageData,
            backup: { ...backup[0] },
            features,
            routes,
        },
        revalidate: 1,
    };
};

export default Home;
