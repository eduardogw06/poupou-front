export interface INewTransactionPayload {
    transaction_id: string;
    target_id: string;
    type_id: string;
    amount: string;
    date: Date;
}