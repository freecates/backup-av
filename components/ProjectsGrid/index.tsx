import { useRouter } from 'next/router';
import Link from 'next/link';
import { IProject } from '@interfaces/index';
import Image from 'next/image';
import Share from '@components/Share';

import styles from './ProjectsGrid.module.scss';

const ButtonLabel = {
    es: 'Comparte',
    ca: 'Comparteix',
};

interface ProjectProps {
    data: {
        featured: IProject[];
        notFeatured: IProject[];
    };
}

const ProjectsGrid: React.FC<ProjectProps> = ({ data }) => {
    const { locale } = useRouter();
    const { featured, notFeatured } = data;
    return (
        <div className={styles['portfolio-component']}>
            {featured && featured.length
                ? featured.map((p) => (
                      <div
                          key={p.acf.name}
                          className={styles['featured-project']}
                          style={{
                              backgroundImage: `url(${p.acf.img.url})`,
                              backgroundColor: p.acf.color,
                          }}
                      >
                        {p?.acf?.logo?.url &&
                          <div className={styles['logo-project']}>
                              <Image
                                  src={`${p?.acf?.logo?.url}`}
                                  alt={p?.acf?.logo?.alt}
                                  width='250'
                                  height='150'
                              />
                          </div>
                        }
                          <div
                              className={styles['featured-project-card']}
                              style={{ color: p.acf.color }}
                          >
                              <h2>
                                  <Link href={`${locale}/projects/${p.id}/${p.slug}`}>{p.acf.name}</Link>
                              </h2>
                              <hr style={{ borderColor: p.acf.color }} />
                              <p>{p.acf.description}</p>
                              <hr style={{ borderColor: p.acf.color }} />
                              <div className={styles['share-wrapper']}>
                                  <Share
                                      buttonColor={p.acf.color}
                                      label={ButtonLabel[locale as keyof typeof ButtonLabel]}
                                      title={p.acf.name}
                                      text={p.acf.description}
                                      url={`${locale}/projects/${p.id}/${p.slug}`}
                                  />
                              </div>
                          </div>
                      </div>
                  ))
                : null}

            {notFeatured && notFeatured.length
                ? notFeatured.map((p) => (
                      <div key={p.acf.name} className={styles['project']}>
                          <div className={styles['project-img']}>
                              <div
                                  className={styles['bg-project-img']}
                                  style={{
                                      backgroundImage: `url(${p.acf.img.url})`,
                                  }}
                              >
                            {p?.acf?.logo?.url &&
                                  <Image
                                      src={`${p.acf.logo.url}`}
                                      alt={p.acf.logo.alt}
                                      loading='lazy'
                                      width='250'
                                      height='150'
                                  />
                            }
                              </div>
                          </div>
                          <div className={styles['project-description']}>
                              <h2>
                                  <Link href={`${locale}/projects/${p.id}/${p.slug}`}>{p.acf.name}</Link>
                              </h2>
                              <p style={{ maxWidth: '290px' }}>{p.acf.description}</p>

                              <Share
                                  buttonColor={'rgb(241, 9, 9)'}
                                  label={ButtonLabel[locale as keyof typeof ButtonLabel]}
                                  title={p.acf.name}
                                  text={p.acf.description}
                                  url={`${locale}/projects/${p.id}/${p.slug}`}
                              />
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
};

export default ProjectsGrid;
