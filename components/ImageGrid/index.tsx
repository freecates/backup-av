import Image from 'next/image';
import styles from './ImageGrid.module.scss';
import { IImage } from '@interfaces/index';

const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

type ImageGridProps = {
    data: [
        {
            name: string;
            img: IImage;
        },
    ];
    imageType: string;
};

const ImageGrid: React.FC<ImageGridProps> = ({ data, imageType }) => {
    return (
        <ul className={styles.grid}>
            {data.map((d) => (
                <li key={d.name} className={styles[imageType]}>
                    <Image
                        src={`${staticDataUrl}${d.img[imageType].url}`}
                        alt={d.name}
                        width={d.img[imageType].width}
                        height={d.img[imageType].height}
                        layout={'responsive'}
                        quality={100}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ImageGrid;
