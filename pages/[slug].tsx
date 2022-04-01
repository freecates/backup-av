import Layout from '@components/Layout';
import api from '@libs/api.js';
import { useRouter } from 'next/router';
import styles from '@styles/Page.module.scss';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { IRoute } from '@interfaces/index';
import React from 'react';

interface Props {
    routes: { [key: string]: IRoute[] };
    otherRoutes: { [key: string]: IRoute[] };
    staticPage: {
        content: {
            rendered: string;
        };
        title: {
            rendered: string;
        };
    };
}

const StaticPage: NextPage<Props> = ({ staticPage, routes, otherRoutes }) => {
    const { locale } = useRouter();
    const { content, title } = staticPage;
    const navRoutes = routes[locale as keyof typeof routes];
    const otherNavRoutes = otherRoutes[locale as keyof typeof otherRoutes];
    return (
        <Layout
            pageTitle={title.rendered}
            pageDescription={title.rendered}
            siteTitle={title.rendered}
            navRoutes={navRoutes}
            otherRoutes={otherNavRoutes}
        >
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{title.rendered}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: content.rendered,
                        }}
                    />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const [staticPages] = await Promise.all([api.staticPages.getData()]);
    const paths = staticPages.map((f: { slug: any }) => `/ca/${f.slug}`);

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const [staticPages, routes, otherRoutes] = await Promise.all([
        api.staticPages.getData(),
        api.routes.getData(),
        api.otherRoutes.getData(),
    ]);

    const singleStaticPage = staticPages.filter((s: { slug: any }) => s.slug === params!.slug);

    return {
        props: {
            staticPage: {...singleStaticPage[0]},
            routes,
            otherRoutes,
        },
        revalidate: 1,
    };
};

export default StaticPage;
