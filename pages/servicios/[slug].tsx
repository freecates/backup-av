import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Button from '@components/button';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';

interface Props {
    feature: {
        id: number;
        acf: {
            title: string;
            featured_list: [{ feature: string }];
            claim: string;
            url: string;
            featured_image: { alt: string; url: string; width: number; height: number };
        };
    };
}

const Servicio: NextPage<Props> = ({ feature }) => {
    const { title, featured_list: featureList, claim, featured_image: featureImage } = feature.acf;
    return (
        <Layout pageTitle={title} pageDescription={title} siteTitle={title} navRoutes={[]}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{claim}</p>
                    <ul>
                        {featureList.map((l) => (
                            <li className={styles.decription} key={l.feature}>
                                {l.feature}
                            </li>
                        ))}
                    </ul>
                    <div className={styles['button-wrapper']}>
                        <Button name={'Contacta'} isAnchor url={'/contacta'} />
                    </div>
                </main>
            </div>
            <div className={styles['image-wrapper']}>
                <Image
                    src={`${featureImage.url}`}
                    alt={featureImage.alt}
                    width={featureImage.width}
                    height={featureImage.height}
                    layout={'responsive'}
                />
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const [feature] = await Promise.all([api.feature.getData()]);
    const paths = feature.map((f: { acf: any }) => `/servicios/${f.acf.url}`);

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const [feature] = await Promise.all([api.feature.getData()]);

    const singleFeature = feature.filter((f: { acf: any }) => f.acf.url === params!.slug);

    return {
        props: {
            feature: { ...singleFeature[0] },
        },
        revalidate: 1,
    };
};

export default Servicio;
