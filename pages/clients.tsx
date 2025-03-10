import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import ImageGrid from '@components/ImageGrid';
import Button from '@components/Button';
import { IImage, IRoute, IMeta } from '@interfaces/index';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

interface Props {
    backupClientsPage: {
        [key: string]: {
            meta: IMeta;
            content: {
                title: string;
                description: string;
            };
            featuredImage: { name: string; url: string; width: number; height: number };
        };
    };
    routes: { [key: string]: IRoute[] };
    clientData: [
        {
            id: number;
            acf: {
                img: IImage;
            };
        },
    ];
}

const Clientes: NextPage<Props> = ({ backupClientsPage, routes, clientData }) => {
    const { locale } = useRouter();
    console.log(locale)
    const navRoutes = routes[locale as keyof typeof routes];
    const { meta, content, featuredImage } =
        backupClientsPage[locale as keyof typeof backupClientsPage];

    return (
        <Layout
            pageTitle={meta.pageTitle}
            pageDescription={meta.pageDescription}
            siteTitle={meta.title}
            navRoutes={navRoutes}
        >
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{content.title}</h1>
                    <p className={styles.description}>{content.description}</p>
                    <div className={styles['button-wrapper']}>
                        <Button name={'Contacta'} isAnchor url={`/${locale}/contacta`} />
                    </div>
                    <div className={'wrapper'}>
                        <ImageGrid data={clientData} imageType={'color'} />
                    </div>
                </main>
            </div>
            <div className={styles['image-wrapper']}>
                <Image
                    src={`${staticDataUrl}assets/img/${featuredImage.url}`}
                    alt={featuredImage.name}
                    width={featuredImage.width}
                    height={featuredImage.height}
                    layout={'responsive'}
                />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [clientsPage, routes, clientData] = await Promise.all([
        api.clientsPage.getData(),
        api.routes.getData(),
        api.clientData.getData(),
    ]);

    return {
        props: {
            backupClientsPage: clientsPage,
            routes,
            clientData: clientData,
        },
        revalidate: 1,
    };
};

export default Clientes;
