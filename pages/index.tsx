import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '@libs/api.js';
import Layout from '@components/Layout';
import Button from '@components/Button';
import ProjectsGrid from '@components/ProjectsGrid';
import { IRoute, IMeta, IImage, IProject } from '@interfaces/index';
import { sorted } from '@utils/sorted';
import ImageGrid from '@components/ImageGrid';

import styles from '@styles/Page.module.scss';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

interface Props {
    routes: { [key: string]: IRoute[] };
    otherRoutes: { [key: string]: IRoute[] };
    backup: {
        [key: string]: {
            meta: IMeta;
            content: {
                description: string;
            };
            features: {
                title: string;
                description: string;
            };
            featuredImage: { name: string; url: string; width: number; height: number };
        };
    };
    feature: [
        {
            id: number;
            acf: {
                title_dev: { [key: string]: string };
                feature_list_dev: { [key: string]: [{ feature: string }] };
                claim_dev: { [key: string]: string };
                url_dev: { [key: string]: string };
                featured_image: { alt: string; url: string; width: number; height: number };
            };
        },
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

const Home: NextPage<Props> = ({
    routes,
    otherRoutes,
    backup,
    feature,
    clientData,
    featuredProjectData,
}) => {
    const router = useRouter();
    const { locale } = useRouter();
    const { meta, content, features, featuredImage } = backup[locale as keyof typeof backup];
    const navRoutes = routes[locale as keyof typeof routes];
    const otherNavRoutes = otherRoutes[locale as keyof typeof otherRoutes];
    const sortedFeature: typeof feature = sorted(feature, 'id');
    const data = { featured: featuredProjectData, notFeatured: [] };

    return (
        <Layout
            siteTitle={meta.pageTitle}
            navRoutes={navRoutes}
            otherRoutes={otherNavRoutes}
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
                            <Button name={'Contacta'} isAnchor url={`${locale}/contacta`} />
                        </div>
                        <div role='region' aria-labelledby='features'>
                            <div className={'wrapper'}>
                                <h2 dangerouslySetInnerHTML={{
                                __html: features.title,
                            }} />
                                <p>{features.description}</p>
                                <div className={styles['grid']}>
                                    {sortedFeature.map((f) => {
                                        return (
                                        <div
                                            title={`Ir a ${f.acf.title_dev[locale as keyof typeof f.acf.title_dev]}`}
                                            key={f.acf.title_dev[locale as keyof typeof f.acf.title_dev]}
                                            className={styles['card']}
                                            onClick={() => router.push(`/${locale}/s/${f.acf.url_dev[locale as keyof typeof f.acf.url_dev]}`)}
                                        >
                                            <h3>{f.acf.title_dev[locale as keyof typeof f.acf.title_dev]}</h3>
                                            <ul>
                                                {f.acf.feature_list_dev[locale as keyof typeof f.acf.feature_list_dev].map((l) => (
                                                    <li key={l.feature}>{l.feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {featuredProjectData ? (
                <div className={styles['bg-projects']}>
                    <ProjectsGrid data={data} />
                    <p className={styles.more}>
                        <Link href={`/${locale}/proyectos`}>[+]</Link>
                    </p>
                </div>
            ) : null}
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
    const [backup, feature, routes, otherRoutes, clientData, projectData] = await Promise.all([
        api.backup.getData(),
        api.feature.getData(),
        api.routes.getData(),
        api.otherRoutes.getData(),
        api.clientData.getData(),
        api.projectData.getData(),
    ]);
    const featuredProjectData =
        projectData && projectData.length
            ? projectData.filter((f: { acf: any }) => f.acf.featured === true)
            : null;

    return {
        props: {
            backup,
            feature,
            routes,
            otherRoutes,
            clientData: clientData,
            featuredProjectData: featuredProjectData,
        },
        revalidate: 1,
    };
};

export default Home;
