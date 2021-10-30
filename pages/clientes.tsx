import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import ImageGrid from '@components/ImageGrid';
import Button from '@components/button';
import { IImage, IRoute } from '@interfaces/index';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

interface Props {
    backupClientsPage: {
        featuredImage: { name: string; url: string; width: number; height: number };
    };
    routes: IRoute[];
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
    const { featuredImage } = backupClientsPage;

    return (
        <Layout
            pageTitle={'Clientes'}
            pageDescription={'Clientes Backup AV'}
            siteTitle={'Clientes Backup AV'}
            navRoutes={routes}
        >
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>Ellos nos han dado su confianza</h1>
                    <p className={styles.description}>Esperamos poder contar con la tuya</p>
                    <div className={styles['button-wrapper']}>
                        <Button name={'Contacta'} isAnchor url={'/contacta'} />
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
            backupClientsPage: { ...clientsPage[0] },
            routes,
            clientData: clientData,
        },
        revalidate: 1,
    };
};

export default Clientes;
