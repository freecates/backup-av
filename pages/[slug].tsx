import Layout from '@components/Layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { IRoute } from '@interfaces/index';
import React from 'react';

interface Props {
    routes: IRoute[];
    otherRoutes: IRoute[];
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
    const { content, title } = staticPage;
    return (
        <Layout
            pageTitle={title.rendered}
            pageDescription={title.rendered}
            siteTitle={title.rendered}
            navRoutes={routes}
            otherRoutes={otherRoutes}
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
    const paths = staticPages.map((f: { slug: any }) => `/${f.slug}`);

    return { paths, fallback: false };
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
