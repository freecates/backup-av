import styles from './Button.module.scss';

type ButtonProps = {
    name: string;
    isAnchor: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
    url: string;
    isSmall?: boolean;
    isActive?: boolean;
    noShadow?: boolean;
};

const Button: React.FC<ButtonProps> = ({ name, isAnchor, type, url, isSmall, isActive, noShadow }) => (
    <div className={styles.button}>
        {isAnchor ? (
            <a
                href={url}
                className={`${isSmall ? styles.small : ''} ${isActive ? styles.active : ''} ${noShadow ? styles['no-shadow'] : ''}`}
            >
                {name}
            </a>
        ) : (
            <button
                name={name}
                type={type}
                className={`${isSmall ? styles.small : ''} ${noShadow ? styles['no-shadow'] : ''}`}
            >
                {name}
            </button>
        )}
    </div>
);

export default Button;
