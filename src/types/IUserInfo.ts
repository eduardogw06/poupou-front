export interface IUserInfo {
    dark_theme: boolean;
    email: string;
    name: string;
    photo: string | null;
    created_at: Date;
    achievements: Achievements;
}

export interface Achievements {
    [key: string]: Achievement;
}

export interface Achievement {
    value: boolean;
    text: string;
}