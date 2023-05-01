import { IGetTransaction } from "./IGetTransaction";

export interface MyTransactions {
    columns: string[];
    rows: IGetTransaction[] | [];
}