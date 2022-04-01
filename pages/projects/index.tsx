import Layout from '@components/Layout';
import api from '@libs/api.js';
import { useRouter } from 'next/router';
import styles from '@styles/Page.module.scss';
import Button from '@components/Button';
import ProjectsGrid from '@components/ProjectsGrid';
import { GetStaticProps, NextPage } from 'next';
import { IRoute, IMeta, IProject } from '@interfaces/index';

interface Props {
    routes: { [key: string]: IRoute[] };
    projectsPage: {
        [key: string]: {
            meta: IMeta;
            content: {
                title: string;
                description: string;
            };            
            button: {
                name: string;
                url: string;
            }
        };
    };
    featuredProjectData: IProject[];
    notFeaturedProjectData: IProject[];
}

const Projects: NextPage<Props> = ({ routes, projectsPage, featuredProjectData, notFeaturedProjectData }) => {
    const { locale } = useRouter();
    const { meta, content, button } = projectsPage[locale as keyof typeof projectsPage];
    const navRoutes = routes[locale as keyof typeof routes];
    const data = { featured: featuredProjectData, notFeatured: notFeaturedProjectData };
    
    return (
        <Layout
            pageTitle={meta.pageTitle}
            pageDescription={meta.pageDescription}
            siteTitle={meta.title}
            navRoutes={navRoutes}
        >
            <div className={styles['with-portfolio']}>
                <div className={`${styles.container}`}>
                    <main className={styles.main}>
                        <h1 className={styles.title}>{content.title}</h1>
                        <p className={styles.description}>
                            {content.description}
                        </p>
                        <div className={styles['button-wrapper']}>
                            <Button name={button.name} isAnchor url={button.url} />
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
    const [routes, projectsPage, projectData] = await Promise.all([
        api.routes.getData(),
        api.projectsPage.getData(),
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
            projectsPage,
            featuredProjectData: featuredProjectData,
            notFeaturedProjectData: notFeaturedProjectData,
        },
        revalidate: 1,
    };
};

export default Projects;
