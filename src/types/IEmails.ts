import { IGetEmail } from "./IGetEmail";

export interface IEmails {
    columns: string[];
    rows: IGetEmail[] | [];
}