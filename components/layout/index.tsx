import Head from 'next/head';
import Nav from '@components/nav';
import Footer from '@components/footer';
import { IRoute } from '@interfaces/index';

import styles from './Layout.module.scss';

type Props = {
    home?: boolean;
    pageTitle: string;
    titlePage: string;
    pageDescription: string;
    children: any;
    navRoutes: IRoute[];
};

const Layout: React.FC<Props> = ({
    home,
    pageTitle,
    titlePage,
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
            <title>{!home ? `${pageTitle} | ${titlePage}` : pageTitle}</title>
            <meta
                name='description'
                content={!home ? `${pageDescription} | ${titlePage}` : pageDescription}
            />
            <link rel='icon' href='/favicon.ico' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='regadorafest' />
            <meta
                name='twitter:creator'
                content='Backup Audiovisuals - La ciutat de les alternatives'
            />
            <meta
                name='twitter:title'
                content={!home ? `${pageTitle} | ${titlePage}` : pageTitle}
            />
            <meta
                name='twitter:description'
                content={!home ? `${pageDescription} | ${titlePage}` : pageDescription}
            />
            <meta
                name='twitter:image:src'
                content={'https://regadora.cat/tampo-color-regadora.jpg'}
            />
            <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='true' />
        </Head>
        <div className={styles['nav-wrapper']}>
            <Nav title={titlePage} navRoutes={navRoutes} />
        </div>
        <div>{children}</div>
        <Footer />
    </>
);

export default Layout;
