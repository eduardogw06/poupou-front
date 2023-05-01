export interface INewTargetPayload {
    description: string;
    category_id: string;
    user_id: string;
    target_amount: string;
    date_begin: Date | string | null;
    date_end: Date | string | null;
}