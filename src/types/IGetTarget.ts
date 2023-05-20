export interface IGetTarget {
    uuid: string;
    description: string;
    category_id: string;
    category: string;
    category_icon: string;
    user_id: string;
    target_amount: number;
    total_saved: number;
    target_percent: number;
    date_begin: Date;
    date_end: Date;
}