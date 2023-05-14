import { IGetAutomaticInvestments } from "./IGetAutomaticInvestments";

export interface IAutomaticInvestments {
    columns: string[];
    rows: IGetAutomaticInvestments[] | [];
}