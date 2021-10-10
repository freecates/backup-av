import Head from 'next/head';
import Nav from '@components/nav';
import Footer from '@components/footer';
import { IRoute } from '@interfaces/index';

import styles from './Layout.module.scss';

type Props = {
    home?: boolean;
    pageTitle: string;
    siteTitle: string;
    pageDescription: string;
    children: any;
    navRoutes: IRoute[];
};

const Layout: React.FC<Props> = ({
    home,
    pageTitle,
    siteTitle,
    pageDescription,
    children,
    navRoutes,
}) => (
    <>
        <Head>
            <meta charSet='utf-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
            />
            <meta name='theme-color' content='#ffffff' />
            <link rel='apple-touch-icon' href='/icons/icon-192x192.png'></link>
            <link rel='manifest' href='/manifest.json' />
            <title>{!home ? `${pageTitle} | ${siteTitle}` : siteTitle}</title>
            <meta
                name='description'
                content={!home ? `${pageDescription} | ${siteTitle}` : pageDescription}
            />
            <link rel='icon' href='/favicon.ico' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='regadorafest' />
            <meta
                name='twitter:creator'
                content='Backup Audiovisuals - Integración de sistemas audiovisuales'
            />
            <meta
                name='twitter:title'
                content={!home ? `${pageTitle} | ${siteTitle}` : siteTitle}
            />
            <meta
                name='twitter:description'
                content={!home ? `${pageDescription} | ${siteTitle}` : pageDescription}
            />
            <meta
                name='twitter:image:src'
                content={'https://regadora.cat/backup-av-site-image.jpg'}
            />
            <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='true' />
        </Head>
        {navRoutes && navRoutes.length ? (
            <div className={styles['nav-wrapper']}>
                <Nav title={siteTitle} navRoutes={navRoutes} />
            </div>
        ) : null}
        <div>{children}</div>
        <Footer />
    </>
);

export default Layout;
