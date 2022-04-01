import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import Button from '@components/Button';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { IRoute } from '@interfaces/index';

interface Props {
    routes: { [key: string]: IRoute[] };
    feature: [
        {
            id: number;
            acf: {
                title_dev: { [key: string]: string };
                feature_list_dev: { [key: string]: [{ feature: string }] };
                claim_dev: { [key: string]: string };
                url_dev: { [key: string]: string };
                featured_image: { alt: string; url: string; width: number; height: number };
            };
        },
    ];
    fslug: string;
}

const Servicio: NextPage<Props> = ({ feature, routes, fslug }) => {
    const { locale } = useRouter();
    const navRoutes = routes[locale as keyof typeof routes];
    const singleFeature = feature.filter((f: { acf: any }) => f.acf.url_dev[locale as keyof typeof f.acf.url_dev] === fslug);
    const { title_dev, feature_list_dev: featureList, claim_dev, featured_image: featureImage } = singleFeature[0].acf;
    return (
        <Layout pageTitle={title_dev[locale as keyof typeof title_dev]} pageDescription={title_dev[locale as keyof typeof title_dev]} siteTitle={title_dev[locale as keyof typeof title_dev]} 
        navRoutes={navRoutes}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{title_dev[locale as keyof typeof title_dev]}</h1>
                    <p className={styles.description}>{claim_dev[locale as keyof typeof claim_dev]}</p>
                    <ul>
                        {featureList[locale as keyof typeof featureList].map((l) => (
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
    const paths = feature.map((f: { acf: any }) => `/ca/s/${f.acf.url_dev['ca']}`);

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { fslug } = params!;
    const [feature, routes] = await Promise.all([api.feature.getData(), api.routes.getData()]);

    return {
        props: {
            feature,
            routes,
            fslug: fslug,
        },
        revalidate: 1,
    };
};

export default Servicio;
