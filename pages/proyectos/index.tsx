import Layout from '@components/Layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Button from '@components/Button';
import ProjectsGrid from '@components/ProjectsGrid';
import { GetStaticProps, NextPage } from 'next';
import { IRoute, IProject } from '@interfaces/index';

interface Props {
    routes: IRoute[];
    featuredProjectData: IProject[];
    notFeaturedProjectData: IProject[];
}

const Projects: NextPage<Props> = ({ routes, featuredProjectData, notFeaturedProjectData }) => {
    const data = { featured: featuredProjectData, notFeatured: notFeaturedProjectData };
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
            {featuredProjectData ? (
                <div className={styles['bg-projects']}>
                    <ProjectsGrid data={data} />
                </div>
            ) : null}
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [routes, projectData] = await Promise.all([
        api.routes.getData(),
        api.projectData.getData(),
    ]);
    const featuredProjectData =
        projectData && projectData.length
            ? projectData.filter((f: { acf: any }) => f.acf.featured === true)
            : null;
    const notFeaturedProjectData =
        projectData && projectData.length
            ? projectData.filter((f: { acf: any }) => f.acf.featured !== true)
            : null;

    return {
        props: {
            routes,
            featuredProjectData: featuredProjectData,
            notFeaturedProjectData: notFeaturedProjectData,
        },
        revalidate: 1,
    };
};

export default Projects;
