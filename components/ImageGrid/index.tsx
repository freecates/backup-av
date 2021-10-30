import Image from 'next/image';
import styles from './ImageGrid.module.scss';
import { IImage } from '@interfaces/index';

type ImageGridProps = {
    data: [
        {
            acf: {
                img: IImage;
            };
        },
    ];
    imageType: string;
};

const ImageGrid: React.FC<ImageGridProps> = ({ data, imageType }) => {
    return (
        <ul className={styles.grid}>
            {data.map((d) => (
                <li key={d.acf.img[imageType].alt} className={styles[imageType]}>
                    <Image
                        src={d.acf.img[imageType].url}
                        alt={d.acf.img[imageType].alt}
                        width={d.acf.img[imageType].width}
                        height={d.acf.img[imageType].height}
                        layout={'responsive'}
                        quality={100}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ImageGrid;
