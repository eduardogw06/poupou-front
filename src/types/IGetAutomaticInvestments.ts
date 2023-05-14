export interface IGetAutomaticInvestments {
    uuid: string;
    target: {
        uuid: string;
        description: string;
    },
    amount: number;
    day: number;
    active: boolean;
}