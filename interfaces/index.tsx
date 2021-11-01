export interface IRoute {
    map(arg0: (r: any, id: any) => JSX.Element): import('react').ReactNode;
    name: string;
    route: string;
}

export interface IMeta {
    title: string;
    pageTitle: string;
    pageDescription: string;
}

export interface IContact extends IMeta {
    name: string;
    address: string;
    phone: {
        number: string;
        href: string;
    };
    web: string;
    email: {
        address: string;
        href: string;
    };
    map: {
        url: string;
        title: string;
    };
}

export interface IImage {
    url: string;
    width: number;
    height: number;
    alt: string;
    [key: string]: any;
}

export interface IProject {
    id: number;
    acf: {
        img: IImage;
        name: string;
        description: string;
        color: string;
        logo: IImage;
    };
}
