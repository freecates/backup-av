import Layout from '@components/Layout';
import styles from '@styles/Page.module.scss';
import api from '@libs/api.js';
import type { GetStaticProps, NextPage } from 'next';
import { IRoute, IContact } from '@interfaces/index';
import Image from 'next/image';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

interface Props {
    routes: IRoute[];
    contacta: {
        meta: IContact;
        featuredImage: { name: string; url: string; width: number; height: number };
    };
}

const Contacta: NextPage<Props> = ({ contacta, routes }) => {
    const { title, pageTitle, pageDescription, name, address, phone, web, email, map } =
        contacta.meta;
    const { url, name: imageName, width, height } = contacta.featuredImage
    return (
        <Layout
            siteTitle={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
        >
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={`${ styles.subtitle} ${ styles['no-color'] }`}>
                        <a href={phone.href} title={`¿Qué necesitas? Llamanos a ${name}`}>
                            {phone.number}
                        </a>
                        <br />
                        <a href={email.href} title={`¿Qué necesitas? Escríbenos a ${name}`}>
                            {email.address}
                        </a>
                    </h1>
                    <p className={styles.description}>
                        <strong className={'backup'} dangerouslySetInnerHTML={{
                            __html: name,
                        }} />
                        <br />
                        [{web}]
                        <br />
                        {address}
                    </p>
                    <h2 className={styles.subtitle}>
                                <a
                                    href={map.url}
                                    title={map.title}
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                >
                                    Ubicación
                                </a>
                            </h2>
                    
                </main>
            </div>
            <div className={styles['image-wrapper']}>
                <Image
                    src={`${staticDataUrl}assets/img/${url}`}
                    alt={imageName}
                    width={width}
                    height={height}
                    layout={'responsive'}
                />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [contacta, routes] = await Promise.all([api.contacta.getData(), api.routes.getData()]);
    return {
        props: {
            contacta: { ...contacta[0] },
            routes,
        },
        revalidate: 60
    };
};

export default Contacta;
