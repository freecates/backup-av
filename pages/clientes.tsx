import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import ImageGrid from '@components/ImageGrid';
import Button from '@components/button';
import { IImage, IRoute } from '@interfaces/index';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

const staticDataUrl = 'https://backup-av-data.vercel.app';

interface Props {
    backupClients: {
        clients: [{ name: string; img: IImage }];
        featuredImage: { name: string; url: string; width: number; height: number };
    };
    routes: IRoute[];
}

const Clientes: NextPage<Props> = ({ backupClients, routes }) => {
    const { clients, featuredImage } = backupClients;
    
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
                        <ImageGrid data={clients} imageType={'color'} />
                    </div>
                </main>
            </div>
            <div className={styles['image-wrapper']}>
                <Image
                    src={`${staticDataUrl}/assets/img/${featuredImage.url}`}
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
    const [clients, routes] = await Promise.all([api.clients.getData(), api.routes.getData()]);

    return {
        props: {
            backupClients: { ...clients[0] },
            routes,
        },
        revalidate: 1,
    };
};

export default Clientes;
