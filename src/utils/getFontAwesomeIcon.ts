import {
    faChevronRight, faDollar, faHeart, faKey, faMobileScreen, faPiggyBank, faRobot, faSignOut,
    faUmbrellaBeach,
    faUser,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    'piggy-bank': faPiggyBank,
    'dollar': faDollar,
    'robot': faRobot,
    'key': faKey,
    'chevron-right': faChevronRight,
    'sign-out': faSignOut,
    'umbrella-beach': faUmbrellaBeach,
    'mobile-screen': faMobileScreen,
    'user': faUser,
};

export const getFontAwesomeIcon = (icon: string): IconDefinition => {
    return icons[icon] ?? faHeart;
}
