import Image from 'next/image';
import styles from './ImageGrid.module.scss';
import { IImage } from '@interfaces/index';
import { sorted } from '@utils/sorted';

type ImageGridProps = {
    data: [
        {
            id: number;
            acf: {
                img: IImage;
            };
        },
    ];
    imageType: string;
};

const ImageGrid: React.FC<ImageGridProps> = ({ data, imageType }) => {
    const sortedData: typeof data = sorted(data, 'id');
    return (
        <ul className={styles.grid}>
            {sortedData.map((d) => (
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
