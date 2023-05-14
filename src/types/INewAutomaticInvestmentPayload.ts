export interface INewAutomaticInvestmentPayload {
    automatic_investment_id?: string;
    target_id: string;
    amount: number;
    day: number;
    active: boolean
}