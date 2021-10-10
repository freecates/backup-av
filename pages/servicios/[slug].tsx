import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Button from '@components/button';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';

const staticDataUrl = 'https://backup-av-data.vercel.app';

interface Props {
    feature: {
        title: string;
        featureList: string[];
        claim: string;
        url: string;
        featureImage: { name: string; url: string; width: number; height: number };
    };
}

const Servicio: NextPage<Props> = ({ feature }) => {
    const { title, featureList, claim, featureImage } = feature;
    return (
        <Layout pageTitle={title} pageDescription={title} siteTitle={title} navRoutes={[]}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{claim}</p>
                    <ul>
                        {featureList.map((l) => (
                            <li className={styles.decription} key={l}>
                                {l}
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
                    src={`${staticDataUrl}/assets/img/${featureImage.url}`}
                    alt={featureImage.name}
                    width={featureImage.width}
                    height={featureImage.height}
                    layout={'responsive'}
                />
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const [features] = await Promise.all([api.features.getData()]);
    const paths = features.map((f: { url: any }) => `/servicios/${f.url}`);

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const [features] = await Promise.all([api.features.getData()]);

    const feature = features.filter(
        (f: { url: string | string[] | undefined }) => f.url === params!.slug,
    );

    return {
        props: {
            feature: { ...feature[0] },
        },
        revalidate: 1,
    };
};

export default Servicio;
