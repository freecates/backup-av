import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { IRoute, IProject } from '@interfaces/index';
import Layout from '@components/Layout';
import ProjectsGrid from '@components/ProjectsGrid';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';

const wpDataUrl = process.env.WORDPRESS_API_URL;

interface Props {
    routes: IRoute[];
    singleProjectData: IProject[];
}

const Project: NextPage<Props> = ({ routes, singleProjectData }) => {
    const metaData = singleProjectData[0];
    const data = { featured: singleProjectData, notFeatured: [] };
    return (
        <Layout
            pageTitle={metaData.acf.name}
            pageDescription={metaData.acf.description}
            siteTitle={'Proyectos Backup AV'}
            navRoutes={routes}
            cardImg={metaData.acf.img.url}
        >
            <div className={styles['with-portfolio']}>
                <div className={`${styles.container}`}>
                    <main className={styles.main}>
                        <h1 className={styles.title}>{metaData.acf.name}</h1>
                    </main>
                </div>
            </div>
            <div className={styles['bg-projects']}>
                <ProjectsGrid data={data} />
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const [projectData] = await Promise.all([api.projectData.getData()]);
    const paths = projectData.map((f: { id: any; slug: any }) => `/proyectos/${f.id}/${f.slug}`);

    return { paths, fallback: false };
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
