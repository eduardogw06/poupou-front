export interface INewTransactionPayload {
    transaction_id: string;
    target_id: string;
    type: "Aporte" | "Retirada";
    amount: number;
    date: Date;
}