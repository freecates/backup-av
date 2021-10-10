import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Page.module.scss';
import ImageGrid from '@components/ImageGrid';
import Button from '@components/button';
import { IImage, IRoute } from '@interfaces/index';
import { GetStaticProps, NextPage } from 'next';

interface Props {
    clients: [{ name: string; img: IImage }];
    routes: IRoute[];
}

const Clientes: NextPage<Props> = ({ clients, routes }) => {
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
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [clients, routes] = await Promise.all([api.clients.getData(), api.routes.getData()]);

    return {
        props: {
            clients,
            routes,
        },
        revalidate: 1,
    };
};

export default Clientes;
