import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Layout from '@components/layout';
import Button from '@components/button';
import { IRoute, IMeta, IImage } from '@interfaces/index';
import ImageGrid from '@components/ImageGrid';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

interface Props {
    routes: IRoute[];
    backup: {
        meta: IMeta;
        content: {
            description: string;
        };
        featuredImage: { name: string; url: string; width: number; height: number };
    };
    features: [{ title: string; featureList: string[]; url: string }];
    clientData: [
        {
            id: number;
            acf: {
                img: IImage;
            };
        },
    ];
}

const Home: NextPage<Props> = ({ routes, backup, features, clientData }) => {
    const { meta, content, featuredImage } = backup;
    const router = useRouter();
    return (
        <Layout
            siteTitle={meta.pageTitle}
            navRoutes={routes}
            pageTitle={''}
            pageDescription={meta.pageDescription}
            home
        >
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{meta.title}</h1>
                    <p
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html: content.description,
                        }}
                    />
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
                            <p>Entidades y empresas líderes confían en nuestros servicios</p>
                            <div className={styles['grid']}>
                                {features.map((f) => (
                                    <div
                                        title={`Ir a ${f.title}`}
                                        key={f.title}
                                        className={styles['card']}
                                        onClick={() => router.push(`/servicios/${f.url}`)}
                                    >
                                        <h3>{f.title}</h3>
                                        <ul>
                                            {f.featureList.map((l) => (
                                                <li key={l}>{l}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <ImageGrid data={clientData} imageType={'gray'} />
                        </div>
                    </div>
                </main>
            </div>
            <div className={styles['image-wrapper']}>
                <Image
                    src={`${staticDataUrl}assets/img/${featuredImage.url}`}
                    alt={featuredImage.name}
                    width={featuredImage.width}
                    height={featuredImage.height}
                    layout={'responsive'}
                />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [backup, features, routes, clientData] = await Promise.all([
        api.backup.getData(),
        api.features.getData(),
        api.routes.getData(),
        api.clientData.getData(),
    ]);

    return {
        props: {
            backup: { ...backup[0] },
            features,
            routes,
            clientData: clientData,
        },
        revalidate: 1,
    };
};

export default Home;
