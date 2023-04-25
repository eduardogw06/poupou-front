import {
    faChevronRight,
    faCirclePlus,
    faDollar,
    faGear,
    faGift,
    faGraduationCap,
    faHeart,
    faHouse,
    faKey,
    faMobileScreen,
    faPiggyBank,
    faPlane,
    faRobot,
    faSignOut,
    faSuitcase,
    faTrash,
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
    'trash': faTrash,
    'gear': faGear,
    'circle-plus': faCirclePlus,
    'gift': faGift,
    'house': faHouse,
    'suitcase-medical': faSuitcase,
    'graduation-cap': faGraduationCap,
    'plane': faPlane,
};

export const getFontAwesomeIcon = (icon: string): IconDefinition => {
    return icons[icon] ?? faHeart;
}
