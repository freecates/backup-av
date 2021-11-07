import React from 'react';
import Button from '@components/Button';

import styles from './Share.module.scss';

interface ModalShareProps {
    modalVisible: boolean;
    shareData: {
        url: string;
    };
    handleClose: any;
}

const ShareModal: React.FC<ModalShareProps> = ({ modalVisible, shareData, handleClose }) => {
    return (
        <>
            <div
                className={`${styles['share-modal']} ${
                    modalVisible ? styles['opened'] : styles['closed']
                }`}
            >
                <section className={styles['modal-header']}>
                    <h3 className={styles['modal-title']}>Share Via</h3>
                    <button className={styles['close-button']} onClick={() => handleClose(false)}>
                        &times;
                    </button>
                </section>
                <section className={styles['modal-body']}>
                    <div className={styles['row']}>
                        <div>
                            <button>Facebook</button>
                        </div>
                        <div>
                            <button>Twitter</button>
                        </div>
                    </div>
                    <div className={styles['row']}>
                        <div>
                            <button>Instagram</button>
                        </div>
                        <div>
                            <button>Tiktok</button>
                        </div>
                    </div>
                </section>
                <section className={styles['modal-footer']}>
                    <div className={styles['modal-footer-link']}>{shareData.url}</div>
                    <button className={styles['modal-footer-button']}>Copy Link</button>
                </section>
            </div>
        </>
    );
};

interface ShareProps {
    buttonColor: string;
    label: string;
    title: string;
    text: string;
    url: string;
}

const Share: React.FC<ShareProps> = ({ buttonColor, label, title, text, url }) => {
    const shareDetails = { title, text, url };
    const [showModal, setShowModal] = React.useState(false);

    const handleSharing = async () => {
        if (navigator.share) {
            try {
                await navigator
                    .share(shareDetails)
                    .then(() => console.log('Hooray! Your content was shared to tha world'));
            } catch (error) {
                console.log(`Oops! I couldn't share to the world because: ${error}`);
            }
        } else {
            alert('Web share is currently not supported on this browser. Sorry');
            // setShowModal(true);
        }
    };
    return (
        <>
            <Button
                name={label}
                isAnchor={false}
                url={url}
                background={buttonColor}
                onClick={handleSharing}
                isSmall
                noShadow
            />
            <ShareModal
                handleClose={setShowModal}
                shareData={shareDetails}
                modalVisible={showModal}
            />
        </>
    );
};
export default Share;
