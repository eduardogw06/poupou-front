interface MyTransactionsDataRow {
    uuid: string;
    amount: string;
    target: {
        uuid: string;
        description: string;
    };
    date: string;
}

export interface MyTransactionsData {
    columns: string[];
    rows: MyTransactionsDataRow[];
}