import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { IRoute, IProject } from '@interfaces/index';
import Custom404 from '@pages/404';
import Layout from '@components/Layout';
import Fallback from '@components/FallBack';
import ProjectsGrid from '@components/ProjectsGrid';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';

interface Props {
    routes: { [key: string]: IRoute[] };
    singleProjectData: IProject[];
}

const Project: NextPage<Props> = ({ routes, singleProjectData }) => {
    const { isFallback, locale } = useRouter();
    if (!isFallback && !singleProjectData) {
        return <Custom404 />;
    }
    if (isFallback) {
        return <Fallback />;
    }
    if (singleProjectData === null) {
        return <Fallback notFound />;
    }
    const navRoutes = routes[locale as keyof typeof routes];
    const metaData = singleProjectData[0];
    const author = metaData._embedded.author[0].name;
    const data = { featured: singleProjectData, notFeatured: [] };
    return (
        <Layout
            pageTitle={metaData.acf.name}
            pageDescription={metaData.acf.description}
            siteTitle={'Proyectos Backup AV'}
            navRoutes={navRoutes}
            cardImg={metaData.acf.img.url}
            withSchema
            id={metaData.id}
            slug={metaData.slug}
            author={author}
            date={metaData.date}
            type={metaData.type}
        >
            <div className={styles['with-portfolio']}>
                <div className={`${styles.container}`}>
                    <main className={styles.main}>
                        <h1 className={styles.title}>{metaData.acf.name}</h1>
                    </main>
                </div>
            </div>
            {singleProjectData ? (
                <div className={styles['bg-projects']}>
                    <ProjectsGrid data={data} />
                </div>
            ) : null}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const [projectData] = await Promise.all([api.projectData.getData()]);
    const paths = projectData.map((f: { id: any; slug: any }) => `/ca/projects/${f.id}/${f.slug}`);

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params!.id;
    const [routes, singleProjectData] = await Promise.all([
        api.routes.getData(),
        api.singleProjectData.getData(id),
    ]);

    return {
        props: {
            routes,
            singleProjectData: [singleProjectData],
        },
        revalidate: 1,
    };
};

export default Project;
