import Layout from '@components/Layout';
import React from 'react';
import styles from './Fallback.module.scss';

type Props = {
    notFound?: boolean;
};

const Fallback: React.FC<Props> = ({ notFound }) => {
    return (
        <Layout
            siteTitle={notFound ? '404' : '... cargando'}
            pageTitle={
                notFound ? 'Página no encontrada o no disponible' : '... Estamos cargando la página'
            }
            pageDescription={''}
            navRoutes={null}
        >
            <div className={`${styles.fallBackComponent}`}>
                <div className={`file${notFound ? '' : ' loading'}`}>
                    <h1>
                        {notFound
                            ? 'Página no encontrada o no disponible en este momento'
                            : '... Cargando'}
                    </h1>
                </div>
                <style jsx>{`
                    .loading {
                        height: 100vh;
                    }
                `}</style>
            </div>
        </Layout>
    );
};

export default Fallback;
