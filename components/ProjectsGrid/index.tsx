import { IProject } from '@interfaces/index';
import Image from 'next/image';

import styles from './ProjectsGrid.module.scss';

interface ProjectProps {
    data: {
        featured: IProject[];
        notFeatured: IProject[];
    };
}

const ProjectsGrid: React.FC<ProjectProps> = ({ data }) => {
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
    );
};

export default ProjectsGrid;
