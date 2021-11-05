import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Layout from '@components/Layout';
import Button from '@components/Button';
import ProjectsGrid from '@components/ProjectsGrid';
import { IRoute, IMeta, IImage, IProject } from '@interfaces/index';
import { sorted } from '@utils/sorted';
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
    feature: [
        { id: number; acf: { title: string; featured_list: [{ feature: string }]; url: string } },
    ];
    clientData: [
        {
            id: number;
            acf: {
                img: IImage;
            };
        },
    ];
    featuredProjectData: IProject[];
}

const Home: NextPage<Props> = ({ routes, backup, feature, clientData, featuredProjectData }) => {
    const { meta, content, featuredImage } = backup;
    const router = useRouter();
    const sortedFeature: typeof feature = sorted(feature, 'id');
    const data = { featured: featuredProjectData, notFeatured: [] };

    return (
        <Layout
            siteTitle={meta.pageTitle}
            navRoutes={routes}
            pageTitle={''}
            pageDescription={meta.pageDescription}
            home
        >
            <div className={styles['with-portfolio']}>
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
                                    {sortedFeature.map((f) => (
                                        <div
                                            title={`Ir a ${f.acf.title}`}
                                            key={f.acf.title}
                                            className={styles['card']}
                                            onClick={() => router.push(`/servicios/${f.acf.url}`)}
                                        >
                                            <h3>{f.acf.title}</h3>
                                            <ul>
                                                {f.acf.featured_list.map((l) => (
                                                    <li key={l.feature}>{l.feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className={styles['bg-projects']}>
                <ProjectsGrid data={data} />
            </div>
            <div className={styles['container']}>

                                <ImageGrid data={clientData} imageType={'gray'} />
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
    const [backup, feature, routes, clientData, projectData] = await Promise.all([
        api.backup.getData(),
        api.feature.getData(),
        api.routes.getData(),
        api.clientData.getData(),
        api.projectData.getData(),
    ]);
    const featuredProjectData =
        projectData && projectData.length
            ? projectData.filter((f: { acf: any }) => f.acf.featured === true)
            : null;

    return {
        props: {
            backup: { ...backup[0] },
            feature,
            routes,
            clientData: clientData,
            featuredProjectData: featuredProjectData,
        },
        revalidate: 1,
    };
};

export default Home;
