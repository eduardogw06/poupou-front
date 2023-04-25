interface IGetTransaction {
    uuid: string;
    target: {
        uuid: string;
        description: string;
    }
    type: {
        uuid: string;
        description: string;
    }
    amount: string;
    date: string;
}