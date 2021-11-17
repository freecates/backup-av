import Head from 'next/head';
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import ScrollToTopButton from '@components/ScrollToTopButton';
import { IRoute } from '@interfaces/index';

import styles from './Layout.module.scss';
import React from 'react';

type Props = {
    home?: boolean;
    pageTitle: string;
    siteTitle: string;
    pageDescription: string;
    children: any;
    navRoutes: IRoute[];
    cardImg?: string;
    withSchema?: boolean;
    type?: string;
    id?: string;
    slug?: string;
    author?: string;
    date?: Date;
};

const Layout: React.FC<Props> = ({
    home,
    pageTitle,
    siteTitle,
    pageDescription,
    children,
    navRoutes,
    cardImg,
    withSchema,
    type,
    id,
    slug,
    author,
    date,
}) => {
    const proyectos = type === 'projects' && 'proyectos';
    return (
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
                <meta name='twitter:site' content='backupav' />
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
                    content={
                        cardImg
                            ? `${cardImg}`
                            : 'https://backup-av.vercel.app/backup-av-site-image.jpg'
                    }
                />
                <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='true' />

                {withSchema ? (
                    <>
                        <script
                            type='application/ld+json'
                            dangerouslySetInnerHTML={{
                                __html: `
                        {
                        "@context": "http://schema.org",
                        "@type": "NewsArticle",
                        "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": "${
                            `https://backup-av.vercel.app/` + proyectos + '/' + id + '/' + slug
                        }"
                        },
                        "author": {
                        "@type": "Person",
                        "name": "${author}"
                        },
                        "publisher": {
                        "@type": "Organization",
                        "name": "Backup Audiovisuals",
                        "logo": {
                        "@type": "ImageObject",
                        "url": "https://backup-av.vercel.app/backup-av-site-image.jpg"
                        }
                        }, 
                        "description": "${pageDescription}",
                        "image": "${cardImg}",
                        "datePublished": "${date}",
                        "headline": "${pageTitle}"
                        }`,
                            }}
                        />
                        <meta property='fb:app_id' content='1064356173625695' />
                        <meta
                            property='og:url'
                            content={`"https://backup-av.vercel.app/${proyectos}/${id}/${slug}`}
                        />
                        <meta property='og:type' content='article' />
                        <meta property='og:title' content={pageTitle} />
                        <meta property='og:description' content={`${pageDescription}`} />
                        <meta property='og:image' content={cardImg} />
                        <meta property='og:image:width' content={'1024'} />
                        <meta property='og:image:height' content={'1024'} />
                    </>
                ) : null}
            </Head>
            {navRoutes && navRoutes.length ? (
                <div className={styles['nav-wrapper']}>
                    <Nav title={siteTitle} navRoutes={navRoutes} />
                </div>
            ) : null}
            <div>{children}</div>
            <div className={styles['scroll-to-top-wrapper']}>
                <ScrollToTopButton visibilityPoint={1000} />
            </div>
            <Footer />
        </>
    );
};

export default Layout;
