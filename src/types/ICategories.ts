import { IGetCategory } from "./IGetCategory";

export interface ICategories {
    columns: string[];
    rows: IGetCategory[] | [];
}