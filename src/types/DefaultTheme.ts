export interface DefaultTheme {
    title: string;

    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;

        text: string;
        buttonText: string;
        menuHamburger: string;
        menuIcon: string;
    };

    sizes: {
        none: string;
        small1: string;
        small2: string;
        small3: string;
        medium1: string;
        medium2: string;
        medium3: string;
        medium4: string;
        large1: string;
        large2: string;
        large3: string;
        large4: string;
        xlarge1: string;
        xlarge2: string;
        xlarge3: string;
    }

    media: {
        sm: string;
        md: string;
        lg: string;
    }

}