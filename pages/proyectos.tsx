import Layout from '@components/layout';
import Image from 'next/image';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Button from '@components/button';
import { GetStaticProps, NextPage } from 'next';
import { IImage, IRoute, IProject } from '@interfaces/index';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

interface Props {
    routes: IRoute[];
    featuredProjectData: IProject[];
    notFeaturedProjectData: IProject[];
}

const Clientes: NextPage<Props> = ({ routes, featuredProjectData, notFeaturedProjectData }) => {
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
            <div className={styles['bg-projects']}>
                <div className={styles['portfolio-container']}>
                    {featuredProjectData && featuredProjectData.length
                        ? featuredProjectData.map((p) => (
                              <div
                                  key={p.acf.name}
                                  className={styles['featured-project']}
                                  style={{
                                      backgroundImage: `url(${p.acf.img.url})`,
                                      backgroundColor: p.acf.color,
                                  }}
                              >
                                  <div className={styles['logo-project']}>
                                      <Image
                                          src={`${p.acf.logo.url}`}
                                          alt={p.acf.logo.alt}
                                          width='250'
                                          height='150'
                                      />
                                  </div>
                                  <div
                                      className={styles['featured-project-card']}
                                      style={{ color: p.acf.color }}
                                  >
                                      <h2>{p.acf.name}</h2>
                                      <hr style={{ borderColor: p.acf.color }} />
                                      <p>{p.acf.description}</p>
                                  </div>
                              </div>
                          ))
                        : null}

                    {notFeaturedProjectData && notFeaturedProjectData.length
                        ? notFeaturedProjectData.map((p) => (
                              <div key={p.acf.name} className={styles['project']}>
                                  <div className={styles['project-img']}>
                                      <div
                                          className={styles['bg-project-img']}
                                          style={{
                                              backgroundImage: `url(${p.acf.img.url})`,
                                          }}
                                      >
                                          <Image
                                              src={`${p.acf.logo.url}`}
                                              alt={p.acf.logo.alt}
                                              loading='lazy'
                                              width='250'
                                              height='150'
                                          />
                                      </div>
                                  </div>
                                  <div className={styles['project-description']}>
                                      <h2 style={{ maxWidth: '260px' }}>{p.acf.name}</h2>
                                      <p style={{ maxWidth: '290px' }}>{p.acf.description}</p>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            </div>
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

export default Clientes;
